# Deployment Guide

## GitHub Pages Setup

### 1. Create the Repository

Go to https://github.com/new and create:
- **Repository name:** `elisonworld.github.io`
- **Owner:** `elisonworld` (create this account if needed)
- **Visibility:** Public
- **Initialize:** Don't add README (we have one)

### 2. Push This Code

```bash
cd /Users/elisoninc./.openclaw/workspace/projects/ElisonInc/cinematic-hub

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: Cinematic hub for elisonworld.com"

# Add remote and push
git remote add origin https://github.com/elisonworld/elisonworld.github.io.git
git branch -M main
git push -u origin main
```

### 3. Configure GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `root`
4. Save

Site will be live at: `https://elisonworld.github.io`

### 4. Connect Custom Domain

The `CNAME` file already contains `elisonworld.com`. 

In repository Settings → Pages:
1. Custom domain: `elisonworld.com`
2. Save
3. Check "Enforce HTTPS" (once DNS propagates)

### 5. DNS Configuration

In your domain registrar (Namecheap, Cloudflare, etc.):

**A Records:**
```
@ → 185.199.108.153
@ → 185.199.109.153
@ → 185.199.110.153
@ → 185.199.111.153
```

**CNAME Record:**
```
www → elisonworld.github.io
```

Or use a single CNAME (if not using apex):
```
www → elisonworld.github.io
```

DNS propagation takes 5-48 hours.

## Post-Deployment Checklist

- [ ] Site loads at https://elisonworld.github.io
- [ ] Custom domain https://elisonworld.com works
- [ ] HTTPS is enforced
- [ ] All three entity links work
- [ ] Mobile responsive
- [ ] Animations smooth

## Updating the Site

```bash
git add .
git commit -m "Update: description"
git push origin main
```

GitHub Actions will auto-deploy via `.github/workflows/deploy.yml`.
