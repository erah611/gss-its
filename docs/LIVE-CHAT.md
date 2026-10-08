# Live chat (tawk.to)

The chat bubble sits in the lower-right corner of every page.

- **Code:** `js/core/chat.js`, loaded in the `<head>` of every page in `html/`,
  with preconnects to `embed.tawk.to` and `va.tawk.to`, so the widget starts
  loading straight away on the first page. It loads the tawk.to widget and
  hides the bubble while the site's own overlays are open (mobile menu, Privacy/Disclaimer
  dialog, Easy Apply). An open conversation is left alone.
- **Everything the visitor sees** — position, colours, greeting and
  messages — is set in the tawk.to dashboard, not in code. tawk.to's
  JavaScript API can only show or hide the widget
  (<https://developer.tawk.to/jsapi/>). Use the settings below so the
  widget matches the site.

Property / widget ID: `6ac79d417c806234ca666229` / `1k4drsife` (in `chat.js`).

## 1. Position

Dashboard → **Administration → Channels → Chat Widget** → this widget →
**Widget Appearance** (menu names may differ slightly in newer versions):

| Setting                      | Value                                |
|------------------------------|--------------------------------------|
| Desktop position             | Bottom right                         |
| Mobile position              | Bottom right                         |
| Desktop / mobile widget type | Bubble (minimised: round, icon only) |
| Offset                       | default                              |

## 2. Colours

The site's palette (`css/base/global.css`): navy `#0F2247`, gold
`#C79A4B` / `#D8A94E`, cream `#F5F1EA`, text `#0F2247`, muted text `#4C5A70`.
Primary buttons on the site are navy with white text, so the chat uses
the same. tawk.to can't follow the site's light/dark toggle; these
colours read well on both.

Choose **Custom** colour in Widget Appearance and set:

| tawk.to setting                   | Colour    | Site token          |
|-----------------------------------|-----------|---------------------|
| Widget / header background        | `#0F2247` | `--navy`            |
| Header text                       | `#FFFFFF` | white               |
| Bubble (minimised) background     | `#0F2247` | `--navy`            |
| Bubble icon                       | `#D8A94E` | `--gold-2`          |
| Agent message background          | `#F5F1EA` | `--bg-cream`        |
| Agent message text                | `#0F2247` | `--navy`            |
| Visitor message background        | `#0F2247` | `--navy`            |
| Visitor message text              | `#FFFFFF` | white               |
| Buttons / links / accent          | `#C79A4B` | `--gold`            |

Avoid white text on gold: `#FFFFFF` on `#C79A4B` is too low-contrast
to read comfortably. Where a setting puts text on gold, use navy text.

If only one colour can be chosen (simple mode), use **`#0F2247`**.

## 3. Messages

Written in the site's own voice (see the Let's Connect page: "Start with
what you're trying to get done…").

Dashboard → **Administration → Channels → Chat Widget → Widget Content**
(and **Pre-Chat Form** / **Offline Form**):

| Where                        | Text |
|------------------------------|------|
| Widget title (online)        | Let's Connect |
| Widget title (away/offline)  | Leave us a message |
| Online status message        | We're here — tell us what you're working on. |
| Away/offline status message  | We're away right now. Leave a note and we'll make sure it reaches the right person. |
| Attention grabber / greeting | Hi there 👋 Questions about consulting, data, delivery or talent? We're happy to help. |
| Pre-chat form intro          | Before we start, tell us a little about you so we can route your question to the right GSS team. |
| Pre-chat fields              | Name (required), Email (required), "How can we help?" dropdown: Business Consulting, Data & Business Insight, Technology & Delivery, Global Talent, Alliances, Careers, Something else |
| Offline form intro           | Thanks for reaching out. Leave your details and a short message — we'll get back to you within one business day. |
| Offline form thank-you       | Thank you! Your message has been received — we'll be in touch soon. |
| Chat ended message           | Thanks for chatting with GSS. If anything else comes up, we're here. |

The dropdown options match the "How can we help?" list on the Let's
Connect form. The thank-you line matches that form's success message.

Optional automated greeting: **Administration → Triggers** → new trigger
"Page visit, 30 seconds on page" → message:
"Is there something specific you're looking for? We can point you to the
right team."

## 4. Spam and notifications

Chat messages are a separate channel from the site's forms. They don't
go through the forms' verification code. Set where chat and offline-form
notifications are emailed under **Administration → Channels → Chat
Widget → Offline Form / Email notifications**. To match the forms, use
`contact@gss-its.net`. Turn on the pre-chat form's required Name and
Email fields to cut down on throwaway chats.

## 5. Privacy

tawk.to stores chat transcripts and visitor details (IP address, browser,
pages viewed) on its own servers. The site's Privacy Policy covers
service providers in general but doesn't name live chat. Consider adding
a line naming tawk.to.
