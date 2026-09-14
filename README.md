# Motify

A multi-page web prototype for the Motify platform - a motorcycle
spare parts marketplace connecting riders, vendors, and shop fitters in Kwabenya, Accra.

Phase 1 scope: no online payment. Reservations are held online, then paid in cash
or mobile money directly to the vendor on pickup.

## Running it

Because pages load shared `.js` files via `<script src="...">`, some browsers block
these requests when opening files directly from disk (`file://`). Serve the folder
with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## Structure

```
index.html                 Home - hero search, featured parts, zones, how it works
parts.html                 Browse & filter all parts (checkbox filters, card grid)
part-detail.html           Single part + shop detail, reserve / call / directions
about.html                 About the platform

login.html                 Log in (includes one-click demo accounts)
register.html              Sign up as a rider or vendor
forgot-password.html       Password reset request (stub)
reset-password.html        Password reset form (stub)

rider-dashboard.html       Rider overview
my-reservations.html       Rider's full reservation history
saved-shops.html           Rider's bookmarked shops

vendor-dashboard.html      Vendor overview
my-inventory.html          Vendor's part listings (add/archive)
add-part.html              Add a new part listing
reservations-inbox.html    Incoming reservations with status pipeline
shop-profile.html          Shop & fitter profile + map pin

admin-dashboard.html       Platform stats, pending verifications
vendor-verification.html   Approve/reject vendor registrations
manage-categories.html     Category & bike model master lists
manage-users.html          User account management
reports.html               Reservation/category/vendor reports

profile.html               Shared account profile (all roles)
notifications.html         Shared notification feed (all roles)

database.js                Mock data layer, persisted to localStorage
auth.js                    Mock authentication (prototype - no real passwords)
app.js                     Shared navbar/footer rendering + UI helpers
styles.css                 Shared stylesheet for every page
```

## Demo accounts

Use the quick-login buttons on `login.html`, or these IDs directly in
`Auth.loginAs(id)` from the browser console:

- `rider1` - Kwame Mensah (rider)
- `vendor1` - Kofi Adjei, Adjei Bike Spares (vendor, verified shop)
- `admin1` - Platform Admin

## Resetting demo data

All data lives in `localStorage` under the key `kmp_db_v1`, so changes persist
across page loads. To reset to the original seed data, run in the browser console:

```js
DB.reset();
```
