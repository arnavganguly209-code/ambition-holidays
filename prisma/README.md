# Ambition Holidays — Phase 1 Prisma

Schema lives in `schema.prisma`. Migration SQL is generated **offline**
(`prisma migrate diff --from-empty`) and must **not** be applied until the
dedicated `ambition_holidays` database exists and you explicitly approve deploy.

Do **not** run `prisma db push` against production.
Do **not** connect migrations to other site databases.
