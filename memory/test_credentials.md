# Test Credentials — Naga Law Chambers

## Admin (inquiries endpoint)
- **Endpoint**: `GET /api/inquiries`
- **Header**: `X-Admin-Token: naga-admin-2026`
- **Configured in**: `/app/backend/.env` → `ADMIN_TOKEN=naga-admin-2026`

### Example
```bash
curl -s https://<your-deploy-url>/api/inquiries \
  -H "X-Admin-Token: naga-admin-2026" | jq
```

### Rotate for production
1. Edit `/app/backend/.env` → set a new strong `ADMIN_TOKEN`
2. `sudo supervisorctl restart backend` (preview) or redeploy

## Public Forms
- Contact form (no auth) → `POST /api/inquiries` (open submission, server-side validation only)

## Database
- MongoDB at `mongodb://localhost:27017`, DB `naga_law`, collection `inquiries`
