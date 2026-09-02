#!/usr/bin/env bash
# Ensure ambition.theglobalorbit.com is reachable from all public IPs.
set -u

DOMAIN="ambition.theglobalorbit.com"

run_privileged() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  elif command -v sudo >/dev/null 2>&1 && sudo -n "$@"; then
    :
  else
    echo "WARNING: cannot run privileged command: $*"
    return 1
  fi
}

echo "Ensuring public access for ${DOMAIN}..."

mapfile -t NGINX_CONFS < <(
  grep -rl "${DOMAIN}" /etc/nginx/sites-enabled /etc/nginx/sites-available /etc/nginx/conf.d 2>/dev/null \
    | sort -u || true
)

if [ "${#NGINX_CONFS[@]}" -eq 0 ]; then
  echo "WARNING: No nginx vhost found for ${DOMAIN}."
  exit 0
fi

for conf in "${NGINX_CONFS[@]}"; do
  echo "Processing nginx config: ${conf}"
  run_privileged cp -a "${conf}" "${conf}.bak-$(date -u +%Y%m%dT%H%M%SZ)" || true
  run_privileged sed -i -E '/^[[:space:]]*(allow|deny)[[:space:]]/d' "${conf}" || true
done

if command -v nginx >/dev/null 2>&1; then
  if run_privileged nginx -t; then
    run_privileged systemctl reload nginx || true
    echo "nginx reloaded"
  else
    echo "WARNING: nginx config test failed after cleanup"
  fi
fi

if command -v ufw >/dev/null 2>&1; then
  if run_privileged ufw status 2>/dev/null | grep -qi "Status: active"; then
    echo "Opening ufw ports 80/443 for public access..."
    run_privileged ufw allow 80/tcp || true
    run_privileged ufw allow 443/tcp || true
  fi
fi

echo "Public access check complete for ${DOMAIN}."
