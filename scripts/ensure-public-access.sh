#!/usr/bin/env bash
# Ensure ambition.theglobalorbit.com is reachable from all public IPs.
# Only edits nginx vhosts that mention this hostname.
set -euo pipefail

DOMAIN="ambition.theglobalorbit.com"
APP_PORT="3004"

if [ "$(id -u)" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo -n"
fi

echo "Ensuring public access for ${DOMAIN}..."

mapfile -t NGINX_CONFS < <(
  grep -rl "${DOMAIN}" /etc/nginx/sites-enabled /etc/nginx/sites-available /etc/nginx/conf.d 2>/dev/null \
    | sort -u || true
)

if [ "${#NGINX_CONFS[@]}" -eq 0 ]; then
  echo "WARNING: No nginx vhost found for ${DOMAIN}; skipping nginx rewrite."
else
  for conf in "${NGINX_CONFS[@]}"; do
    echo "Processing nginx config: ${conf}"
    ${SUDO} cp -a "${conf}" "${conf}.bak-$(date -u +%Y%m%dT%H%M%SZ)"
    # Remove IP allow/deny gates that block public visitors.
    ${SUDO} sed -i -E '/^[[:space:]]*(allow|deny)[[:space:]]/d' "${conf}"
  done

  if command -v nginx >/dev/null 2>&1; then
    ${SUDO} nginx -t
    ${SUDO} systemctl reload nginx
    echo "nginx reloaded"
  fi
fi

if command -v ufw >/dev/null 2>&1; then
  if ${SUDO} ufw status 2>/dev/null | grep -qi "Status: active"; then
    echo "Opening ufw ports 80/443 for public access..."
    ${SUDO} ufw allow 80/tcp || true
    ${SUDO} ufw allow 443/tcp || true
  fi
fi

echo "Public access check complete for ${DOMAIN}."
