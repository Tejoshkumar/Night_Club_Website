# NIGHTCLUB --- FRONTEND ENGINEERING & DESIGN SPECIFICATION

**Document:** `FRONTEND.md`\
**Product:** Founder Labs by Nitish · Nightclub\
**Status:** Frontend implementation baseline\
**Audience:** Frontend engineers, product designers, AI coding agents,
QA\
**Source of truth:** `NIGHTCLUB_HOOKED_PRODUCT_BLUEPRINT.md` (Version
1.0, 13 November 2026)\
**Design direction:** Nocturnal Editorial · Subtle Liquid Morphism ·
Builder-first UX

------------------------------------------------------------------------

## 1. Purpose and product definition

Nightclub is an intelligent builder execution network for students,
developers, designers, marketers, creators, founders, operators and
career switchers.

The frontend must help a member move through this journey:

**Understand me → Find my people → Build together → Prove my work →
Unlock my next opportunity → Improve future matching.**

Nightclub is not intended to be another infinite-scroll social network.
It should help members discover complementary people, form consent-based
working relationships, collaborate on real work, document credible
contributions and find relevant opportunities.

### 1.1 Product principles

1.  **Outcomes over screen time.** Optimize for qualified collaboration,
    shipped work and useful opportunities---not session length, feed
    views or raw likes.
2.  **People before algorithms.** Matching recommendations must explain
    why a person or team is suggested. Members retain control over
    requests and acceptance.
3.  **Proof over claims.** Show projects, artifacts, roles and verified
    contributions. Distinguish self-reported work from peer-acknowledged
    and artifact-verified work.
4.  **Consent before connection.** Never automatically enroll members
    into permanent groups or reveal personal contact details.
5.  **Clarity before decoration.** Visual effects must never make
    navigation, reading, messaging or task completion harder.
6.  **A finite experience.** Discovery should have meaningful stopping
    points. Avoid compulsory infinite scrolling and manipulative
    engagement loops.
7.  **Member control.** Provide mute, pause, opt-out, leave, block,
    report and privacy controls wherever relevant.
8.  **Responsive by design.** Web is a first-class React experience;
    mobile layouts must work well at narrow widths and map cleanly to
    the future Flutter application.

### 1.2 Product success signals

The frontend should make these outcomes visible and easy to complete:

-   A member completes a useful Builder Persona.
-   A member reviews a relevant match and understands the reason.
-   Two members mutually accept an introduction.
-   A conversation progresses to a real collaboration.
-   A circle commits to a deliverable.
-   A mission reaches a verifiable milestone.
-   A contribution becomes credible portfolio evidence.
-   A member attends a session and turns it into a next build step.
-   A member discovers and pursues a legitimate opportunity.

Do not treat likes, passive opens or time spent as primary success
indicators.

------------------------------------------------------------------------

## 2. Platform and technical boundaries

### 2.1 Fixed architecture

  -----------------------------------------------------------------------
  Layer                               Decision
  ----------------------------------- -----------------------------------
  Web client                          React + TypeScript

  Mobile client                       Flutter for iOS and Android

  Backend                             Existing Laravel / PHP application

  Database                            Existing MySQL source of truth

  API                                 Versioned Laravel APIs

  Payments                            Preserve the existing payment
                                      integration; audit actual
                                      implementation and store rules

  Web UI styling                      Tailwind CSS

  Component foundation                shadcn/ui, adapted to Nightclub
                                      tokens

  Motion                              Motion for React (`motion`)

  Icons                               Lucide React

  Forms                               React Hook Form + Zod

  Server/API state                    TanStack Query

  3D                                  Spline for selected brand scenes;
                                      custom Three.js/R3F only when
                                      justified

  Interactive illustration            Rive where state-driven vector
                                      animation is useful
  -----------------------------------------------------------------------

Do not migrate the web application to Next.js, replace Laravel,
introduce a second database, or replace the mobile plan with React
Native/Expo without an explicit architecture decision.

### 2.2 Frontend responsibilities

The frontend is responsible for:

-   Rendering the member experience and public marketing pages.
-   Collecting and validating user input.
-   Presenting server-authoritative membership, identity, matching and
    permission state.
-   Managing client-side navigation and temporary UI state.
-   Calling versioned APIs.
-   Displaying loading, empty, error, offline and success states.
-   Requesting notification permissions only in a contextual,
    user-understandable flow.
-   Respecting privacy, visibility, block and mute decisions in the UI.
-   Sending analytics events defined by the product instrumentation
    plan.

The frontend is **not** authoritative for:

-   Subscription validity or entitlement.
-   User roles and admin permissions.
-   Match eligibility or final matching score.
-   Connection acceptance.
-   Group membership.
-   Contribution verification.
-   Payment status.
-   Whether a session link may be shown.
-   Whether a user can access another member's information.

Never trust a client-side `isPaid`, role, match score, visibility or
permission flag as authorization. The backend must enforce access.

### 2.3 Existing-system audit before integration

Before implementing authenticated routes, inspect the current repository
and running system:

-   React/Vite or other existing build setup, routing, package manager
    and conventions.
-   Current Laravel version, API routes, auth mechanism and response
    envelopes.
-   Existing login, password setup, email verification and account
    recovery.
-   Existing membership and subscription lifecycle.
-   Existing Razorpay integration and webhook-driven status.
-   Existing live-session administration, schedule, links and
    entitlements.
-   Existing resources, files, session notes and member-only access.
-   Current admin and moderation capabilities.
-   Existing deployment, environment variables, CORS, storage and
    logging.

Do not guess endpoint paths, payload shapes, auth token format, table
names or production behavior. Document findings in an integration note
before writing API-specific code.

------------------------------------------------------------------------

## 3. Visual identity

### 3.1 Design direction

**Nocturnal Editorial + Subtle Liquid Morphism**

The experience should feel like a calm, private creative studio after
dark: a place where curious people can meet, learn, experiment and build
together.

It must not look like:

-   A loud cyberpunk dashboard.
-   A rainbow neon gaming interface.
-   A generic AI-generated SaaS template.
-   A glass panel on every surface.
-   A portfolio website where every element moves.
-   A social feed optimized for endless scrolling.

The visual hierarchy is built from three layers:

1.  **Obsidian foundation:** dark, solid, readable surfaces.
2.  **Selective glass:** only for floating or layered UI such as
    navigation overlays, dialogs and profile previews.
3.  **Ambient light:** restrained violet light that directs attention to
    a few important moments.

### 3.2 Colour tokens

Use CSS variables/design tokens. The following values are the initial
proposed palette and should be centralized so they can be tuned without
editing individual components.

  Token                Hex         Usage
  -------------------- ----------- ------------------------------
  `--nc-bg`            `#09090D`   Main application background
  `--nc-surface-1`     `#111218`   Sidebar and primary surfaces
  `--nc-surface-2`     `#191A23`   Cards and elevated panels
  `--nc-surface-3`     `#20212C`   Hovered/elevated controls
  `--nc-border`        `#292A36`   Borders and dividers
  `--nc-text`          `#F1F0F5`   Primary text
  `--nc-text-muted`    `#9696A8`   Secondary text
  `--nc-text-subtle`   `#707184`   Metadata and low emphasis
  `--nc-violet`        `#9B7BFF`   Primary brand accent
  `--nc-violet-soft`   `#B9A6FF`   Hover and selected accent
  `--nc-blue`          `#8BB9FF`   Secondary accent
  `--nc-success`       `#9AD8B0`   Success states
  `--nc-warning`       `#E8C58C`   Warning states
  `--nc-danger`        `#E58F9A`   Destructive/error states

Rules:

-   Violet is the primary action and selected-state accent.
-   Blue is secondary and should be used sparingly.
-   Green, amber and red communicate semantic states only.
-   Do not use accent gradients for every button, card or heading.
-   Do not use glowing text for body copy.
-   Maintain accessible contrast; muted text must remain readable.
-   Avoid using colour as the only way to communicate state.

### 3.3 Gradients and lighting

Approved patterns:

-   A faint violet radial glow behind the landing hero.
-   A restrained spotlight behind the primary landing CTA.
-   A subtle gradient on one signature feature card.
-   A low-intensity accent glow around the active navigation state.
-   Soft edge lighting on the 3D brand emblem.

Avoid:

-   Full-page moving gradients.
-   Strong multi-colour mesh backgrounds behind text.
-   Animated gradients on every card.
-   Bright neon borders around every interactive element.
-   High-frequency flicker or pulsing.

### 3.4 Morphism and surface treatments

  -----------------------------------------------------------------------
  Treatment               Use                     Avoid
  ----------------------- ----------------------- -----------------------
  Solid obsidian surfaces Main application cards, Flat, undifferentiated
                          chat, tasks, resource   blocks with no
                          content                 hierarchy

  Subtle glassmorphism    Floating dock,          Every dashboard card
                          dropdown, popover,      and every text
                          dialog, match preview   container

  Bento layout            Home dashboard and      Forcing every page into
                          selected discovery      a bento grid
                          summaries               

  Soft depth / restrained Small toggles and       Main buttons, form
  neumorphism             pressed controls only   fields and critical
                                                  controls

  Aurora / ambient light  Landing hero and        Behind dense content or
                          occasional feature      long text
                          moment                  

  Shared-element          Builder card to         Every route transition
  transitions             profile; mission card   
                          to workspace            
  -----------------------------------------------------------------------

Glass treatment must include a sufficiently opaque fallback surface for
readability and devices where `backdrop-filter` is unavailable.

### 3.5 Typography

Recommended type system:

-   **Display and page headings:** Space Grotesk.
-   **Interface and body:** Inter.
-   **Optional editorial accent:** DM Serif Display, only for occasional
    quotes or campaign copy.

Typography scale:

  Role                Desktop starting size Notes
  ----------------- ----------------------- -------------------------------------
  Landing hero                    64--76 px Responsive clamp; compact on mobile
  Page title                      30--36 px Strong, short and clear
  Section heading                 20--24 px Avoid excessive weight
  Card title                      16--20 px Clear hierarchy
  Body                            14--16 px Readable line-height
  Metadata                        11--13 px Never too faint
  Button                          12--14 px Medium/semibold

Use sentence case. Reserve uppercase and letter spacing for small
eyebrow labels, categories and metadata. Do not set every heading in
uppercase.

### 3.6 Spacing, radii and elevation

Use a consistent spacing scale based on 4px:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80`

Initial radii:

-   Small control: 8px.
-   Standard input/button: 10--12px.
-   Card: 16--20px.
-   Modal: 20--24px.
-   Pill: 999px only for tags, status chips and compact filters.

Use one-pixel borders and low-opacity shadows. Large diffuse shadows are
reserved for floating elements. Avoid excessive nested card borders.

------------------------------------------------------------------------

## 4. Motion and interaction system

### 4.1 Motion philosophy

Motion should explain state, hierarchy and continuity. It should not
demand attention.

Use **balanced motion**:

-   Fast for direct manipulation.
-   Soft for entrances and exits.
-   Spring-based for small tactile interactions.
-   Slow only for atmospheric background objects.
-   No essential information should depend on animation.

### 4.2 Motion tokens

Initial timing tokens:

  Token            Duration Usage
  ------------ ------------ ---------------------------------------
  `instant`      100--120ms Press feedback and tiny state changes
  `fast`         150--180ms Hover, focus and icon state
  `standard`     200--260ms Dropdowns, cards and tabs
  `enter`        280--360ms Dialogs and page content
  `ambient`          8--20s Very subtle decorative 3D movement

Use ease-out for entering elements and ease-in for exits. Use spring
motion sparingly and avoid overshoot on business-critical controls.

### 4.3 Motion patterns

  -----------------------------------------------------------------------
  Pattern                 Implementation          Where
  ----------------------- ----------------------- -----------------------
  Page transition         Short opacity + 6--10px Route content
                          vertical transition     

  Card hover              2--3px lift and border  Builder and opportunity
                          tint                    cards

  Button press            Scale to approximately  Primary and secondary
                          0.98                    actions

  Dialog                  Fade + slight scale     Confirmations and
                                                  previews

  Shared element          Layout transition       Builder preview →
                                                  profile

  Progress                Animate only after      Mission milestones
                          server-confirmed update 

  Match reveal            Stagger small node/card Find Your Four
                          entrances               

  Notification            Small slide/fade        Toasts and inbox
                                                  indicators

  Loading                 Skeleton or restrained  Data loading
                          spinner                 
  -----------------------------------------------------------------------

### 4.4 Signature interactions

**A. Landing spotlight / lamp effect**

-   Use behind the hero headline or 3D emblem.
-   Keep it static or very slowly changing.
-   Keep the headline and CTA readable.
-   Do not use a spotlight behind every page title.

**B. Builder Network / orbital matching**

-   Use a central member node with up to four suggested collaborators.
-   Animate nodes into position when results load.
-   Each node must be keyboard-accessible and have a clear card/list
    alternative.
-   Do not communicate a match as a guarantee or probability of success.
-   Do not hide the reason for a match inside the animation.

**C. Shared-element profile transition**

-   Builder preview card expands into profile detail.
-   Preserve continuity of avatar, name and key identity content.
-   Ensure browser back navigation works and focus is restored
    correctly.

**D. Build progress**

-   Animate a progress state only after the backend confirms it.
-   Show the actual milestone and responsible member.
-   Never fabricate progress or use shame-based overdue effects.

### 4.5 Reduced motion

Respect `prefers-reduced-motion`. Provide a reduced-motion mode that:

-   Removes parallax and continuous decorative movement.
-   Replaces complex transitions with immediate state changes or short
    fades.
-   Keeps all information and controls available.
-   Does not block task completion.

### 4.6 Cursor behaviour

-   Use the native cursor by default.
-   Use native pointer affordance for interactive elements.
-   Optional small violet cursor accent may be used on the public
    landing page only.
-   Optional magnetic movement may be used on the primary hero CTA for
    fine-pointer devices.
-   Do not replace text selection, form cursor, drag affordances or
    accessible focus.
-   Do not use a large follower cursor throughout the authenticated app.
-   Touch devices must not depend on cursor interactions.

------------------------------------------------------------------------

## 5. 3D and visual assets

### 5.1 Signature object

Create one recognizable Nightclub emblem: a geometric N-inspired object
or connected abstract form with dark translucent material and restrained
violet edge lighting.

Use it in:

-   Landing hero.
-   Login / welcome moment.
-   Selected loading or empty states.
-   Small brand motion in marketing content.

Do not create a different 3D visual language for every feature.

### 5.2 Builder network visualization

A node-and-orbit motif can represent people and complementary skills.

Use it in:

-   Find Your Four.
-   A small visual explanation of team composition.
-   Optional project collaboration map.

It must be a progressive enhancement. On small screens or low-powered
devices, show a clear list/card layout instead.

### 5.3 Build object

A simple geometric object can evolve across idea, experiment, milestone
and shipped states. Use only if the state mapping is understandable and
not merely decorative.

### 5.4 Technology and performance rules

-   Use Spline for selected embedded 3D scenes when its performance and
    hosting constraints are acceptable.
-   Use Rive for interactive vector illustrations with defined states.
-   Use React Three Fiber only for custom 3D interactions that justify
    the complexity.
-   Lazy-load below-the-fold 3D.
-   Provide static poster/fallback imagery.
-   Pause or reduce animation when the scene is off-screen.
-   Avoid loading large 3D scenes on the critical path to first content.
-   Do not use 3D for chat, forms, tables, long documents or dense
    workspaces.

------------------------------------------------------------------------

## 6. Navigation and application shell

### 6.1 Desktop navigation

Use a fixed left sidebar, approximately 224--248px wide, with a
restrained dark surface and a thin divider.

**Primary navigation:**

1.  Home
2.  Find Your Four
3.  Discover
4.  Circles
5.  Build Missions
6.  Sessions
7.  Messages
8.  Opportunities
9.  Builder Passport

**Secondary navigation:**

-   Profile
-   Membership
-   Notification preferences
-   Settings
-   Help / support
-   Admin and moderation (role-gated)

Group navigation under concise labels such as **Your Space**, **Build
Together** and **Account**. Do not crowd the sidebar with every
sub-route.

The active route should have:

-   Slightly elevated surface.
-   Muted violet tint.
-   Clear icon and label.
-   Small active indicator or border.
-   Visible keyboard focus independent of active state.

### 6.2 Mobile navigation

The Flutter mobile bottom navigation baseline is:

**Home · Discover · Build · Inbox · Profile**

For the responsive web experience, use the same information architecture
where it fits. Circles and missions live under Build; Find Your Four
appears prominently on Home and Discover; Opportunities are discoverable
within Discover.

Do not force the full desktop sidebar into a mobile drawer as the only
navigation solution.

### 6.3 Top bar

The authenticated desktop top bar may contain:

-   Current page/breadcrumb.
-   Search entry point.
-   Notifications.
-   Profile/avatar menu.

Keep it compact. Do not duplicate every sidebar destination in the top
bar.

### 6.4 Navigation behaviour

-   Use real route links, not clickable generic containers.
-   Preserve browser back/forward behaviour.
-   Support deep links to a permitted conversation, mission, session or
    opportunity.
-   On route changes, set the page title and restore a sensible focus
    location.
-   Unsaved forms must warn before navigation where data loss is
    possible.
-   Permission-denied routes must show a clear explanation and safe next
    step.

------------------------------------------------------------------------

## 7. Responsive layout rules

### 7.1 Breakpoints

Use project-standard Tailwind breakpoints unless the existing repository
already defines a different scale. Initial layout targets:

-   Small mobile: below 640px.
-   Large mobile / tablet: 640--1023px.
-   Desktop: 1024--1279px.
-   Wide desktop: 1280px and above.

Treat breakpoints as layout transitions, not device detection.

### 7.2 Layout behaviour

**Mobile** - Single-column content. - Compact top bar and bottom
navigation. - Touch targets at least 44×44px where practical. - No
hover-only information. - Avoid side-by-side dense cards. - Keep primary
action reachable and obvious.

**Tablet** - Two-column bento layouts where content allows. - Sidebar
may collapse to an icon rail if the navigation remains understandable. -
Preserve comfortable reading width.

**Desktop** - Fixed sidebar. - Main content with a sensible maximum
width. - Two- or three-column dashboard layouts. - Dense collaboration
workspaces may use a secondary panel only where it improves the task.

### 7.3 Responsive content rules

-   Do not shrink desktop tables until unreadable; switch to stacked
    rows/cards or horizontal scrolling with clear affordance.
-   Long names, project titles and skill tags must wrap safely.
-   Dialogs become full-screen or bottom sheets on narrow screens where
    appropriate.
-   Keep chat composer visible when the mobile keyboard opens.
-   3D scenes should be simplified or replaced on mobile.

------------------------------------------------------------------------

## 8. Route map and screen specifications

The following is the intended web product surface. Route names are
proposed logical routes, not claims about existing API or repository
paths. Adapt them to the existing router.

### 8.1 Public routes

  Route                Purpose
  -------------------- ---------------------------------------------------
  `/`                  Public Nightclub landing page
  `/about`             Product philosophy and community
  `/membership`        Membership value and transparent plan information
  `/login`             Member sign-in
  `/register`          Account creation
  `/forgot-password`   Password recovery
  `/reset-password`    Secure password reset
  `/terms`             Terms
  `/privacy`           Privacy policy
  `/refunds`           Refund / cancellation policy

### 8.2 Authenticated routes

  -----------------------------------------------------------------------
  Route                               Purpose
  ----------------------------------- -----------------------------------
  `/app`                              Member home

  `/app/find-your-four`               Four opt-in collaborator
                                      introductions

  `/app/discover`                     People, projects and finite feed

  `/app/members/:id`                  Privacy-safe builder profile

  `/app/connections`                  Requests and accepted connections

  `/app/circles`                      Circle list

  `/app/circles/:id`                  Circle workspace

  `/app/missions`                     Build mission list

  `/app/missions/:id`                 Mission detail and tasks

  `/app/sessions`                     Session calendar and archive

  `/app/sessions/:id`                 Session detail, RSVP and authorized
                                      resources

  `/app/messages`                     Conversation inbox

  `/app/messages/:id`                 Direct conversation

  `/app/opportunities`                Relevant startup, career and
                                      freelance opportunities

  `/app/opportunities/:id`            Opportunity detail and application

  `/app/passport`                     Builder Passport / portfolio

  `/app/profile`                      Persona and profile editing

  `/app/membership`                   Plan, entitlement and billing
                                      status

  `/app/settings`                     Account and privacy settings

  `/app/notifications`                Notification preferences and
                                      history
  -----------------------------------------------------------------------

Admin routes must be separately role-gated and must not appear to
ordinary members.

### 8.3 Landing page

**Goal:** Explain what Nightclub is and make the right people want to
join.

Recommended sections:

1.  Header with brand, concise navigation and membership CTA.
2.  Hero: one clear product promise, short supporting copy, primary CTA.
3.  Signature 3D emblem / spotlight visual.
4.  Explain the loop: meet → build → prove → grow.
5.  Show Find Your Four as a distinctive product capability.
6.  Explain sessions and practical learning.
7.  Show proof-of-work and opportunity outcomes.
8.  Membership details, transparent terms and FAQs.
9.  Footer with policies and contact route.

Hero copy direction:

> Find your people. Build something real.

Supporting copy should explain that Nightclub connects people with
complementary skills and goals so they can work together and turn
contributions into credible proof.

Do not claim guaranteed jobs, cofounders, investors or outcomes.

### 8.4 Login and registration

-   Use a calm, minimal form surface.
-   Keep the brand accent subtle.
-   Provide visible validation and password visibility controls.
-   Explain email verification/password setup where applicable.
-   Show loading and failure states.
-   Do not expose account existence through unsafe recovery messages.
-   Keep legal links accessible.

### 8.5 Onboarding / Builder Persona

**Goal:** Create a minimum viable profile before matching.

Collect only useful information:

-   Current role or identity.
-   Primary and secondary skills.
-   What the member can offer.
-   What the member wants help with.
-   Current goals and editable goal weights.
-   Interests.
-   Availability and preferred working format.
-   Language.
-   Privacy and discoverability preferences.
-   Optional portfolio/project links.

UX requirements:

-   Use short, understandable steps.
-   Show progress without pressuring completion.
-   Allow the user to review and edit AI-suggested tags.
-   Explain why each field improves matching.
-   Avoid requiring phone number, public social handles or precise
    location.
-   Provide a clear matching consent control.
-   Do not show fake matches if there is insufficient eligible
    inventory.

### 8.6 Home dashboard

The home screen must prioritize one next meaningful action.

Recommended order:

1.  **Next meaningful action:** reply, review, accept an introduction,
    join a session or complete a task.
2.  **Find Your Four:** current status, opt-in invitations and
    explanation.
3.  **Active build:** project, milestone and next responsible action.
4.  **Relevant opportunity:** aligned with the member's current goal
    weights.
5.  **Upcoming membership session:** schedule, RSVP and authorized
    resources.
6.  **Finite discovery:** a small selection of relevant work and people.

Use a bento layout only for the dashboard. Keep the most important
action visually dominant.

States to design:

-   New member with incomplete persona.
-   Completed persona with no eligible matches.
-   Pending introductions.
-   Active circle and mission.
-   Upcoming session.
-   No active build yet.
-   Membership expired or payment issue.
-   Returning member with one or more next actions.
-   Fully caught-up state.

### 8.7 Find Your Four

This is a signature experience and deserves a dedicated design system.

Each suggested collaborator card should show:

-   Name and privacy-safe profile information.
-   Role and relevant skills.
-   Proposed contribution to the potential team.
-   Availability/capacity signal where appropriate.
-   Relevant evidence or project sample.
-   A human-readable **Why this person?** explanation.
-   Request introduction, save or dismiss action.
-   Clear pending / accepted / declined state.

Rules:

-   Show up to four; fewer is better than fabricated candidates.
-   Each introduction is individually opt-in.
-   Do not automatically create a permanent group.
-   Explain team-level skill coverage.
-   Avoid public match scores that imply probability of friendship,
    success or employment.
-   Prevent repeated unwanted exposure and respect blocks.
-   Provide a clear list/card fallback if an orbital visualization is
    used.

### 8.8 Discover

Discover is intentional exploration, not an infinite feed.

Provide clear filters for:

-   People.
-   Projects.
-   Skills.
-   Goals.
-   Availability.
-   Language.
-   Opportunity type.

Cards should prioritize work evidence, collaboration intent and useful
context over vanity metrics.

Include:

-   Search.
-   Filters and clear-all.
-   Saved items.
-   Empty state with useful filter suggestions.
-   Finite result boundary or explicit pagination / load-more.
-   "You're caught up" state where relevant.

Do not rank by outrage, raw reactions or popularity alone.

### 8.9 Builder profile

Profile sections:

-   Intro and current direction.
-   Skills offered and skills sought.
-   Goals and interests.
-   Availability / collaboration preferences.
-   Selected projects and artifacts.
-   Contributions and verification labels.
-   Connection state and safe contact action.

Privacy requirements:

-   Never show private email or phone by default.
-   Respect visibility settings.
-   Do not reveal hidden fields through client-side payloads.
-   Blocked members must not be discoverable through alternate routes.

### 8.10 Connections and messages

-   Separate incoming requests, sent requests and accepted connections.
-   Show enough context to understand why a request exists.
-   In-app messaging is available only after accepted connection or
    another explicitly authorized rule.
-   Provide block/report controls.
-   Support message pagination, loading, retry, empty and offline
    states.
-   Show delivery/read state only when supported by backend data.
-   Do not log message bodies in generic analytics.
-   Avoid showing private message text in push notifications by default.

### 8.11 Builder Circles

A circle workspace should contain:

-   Shared objective.
-   Members and roles.
-   Working agreements.
-   Milestones.
-   Tasks and owners.
-   Shared artifacts and links.
-   Activity / updates.
-   Feedback and contribution acknowledgement.
-   Leave / mute / report controls.

Support two-to-five-person teams as a common shape, while allowing
larger circles where justified. Do not force a five-person team.

### 8.12 Build Missions

Mission cards and details should show:

-   Purpose and expected outcome.
-   Required and optional skills.
-   Time expectation, if known.
-   Team/circle association.
-   Tasks and owners.
-   Milestones.
-   Evidence/artifacts.
-   Review and feedback.
-   Actual status from the backend.

Do not invent countdowns, progress or deadlines. Missed milestones
should offer rescoping and communication rather than shame.

### 8.13 Sessions and membership benefits

Preserve the existing live-session member experience while integrating
it into the broader builder workflow.

Session hub should support:

-   Upcoming sessions.
-   Session detail.
-   RSVP.
-   Authorized join link.
-   Schedule and timezone.
-   Session notes and resources.
-   Session archive.
-   Attendance state, only when confirmed by the backend.
-   Follow-up build action.

The initial product assumption is eight included paid build sessions per
month, configurable by admins and not hardcoded. The actual entitlement
and schedule must come from the backend.

Never expose private meeting links to unauthorized users. RSVP does not
mean attended.

### 8.14 Resource library

-   Organize session notes, files, links and other member resources.
-   Show access status.
-   Provide search and simple filters.
-   Show file type and useful metadata.
-   Support loading, unavailable and permission-denied states.
-   Do not fabricate preview content or file availability.

### 8.15 Opportunities

Support startup, jobs, freelance, early-customer and other approved
opportunity types.

Cards should show:

-   Opportunity type.
-   Organization/person where verified.
-   Description and requirements.
-   Location/remote details only if supplied.
-   Application or introduction method.
-   Fit explanation.
-   Evidence the member may want to share.
-   Save / apply / express-interest state.

Clearly distinguish a community introduction from a hiring guarantee. Do
not claim guaranteed placement. Verify opportunity legitimacy before
surfacing it.

### 8.16 Builder Passport

The Builder Passport is a proof-of-work portfolio.

Show:

-   Projects and outcomes.
-   Member role.
-   Contributions.
-   Artifact links.
-   Verification level.
-   Peer acknowledgement where consented.
-   Timeline of meaningful milestones.
-   Share controls and visibility settings.

Verification labels must be explicit:

-   Self-reported.
-   Peer-acknowledged.
-   Artifact-verified.

Do not fabricate endorsements or expose confidential work. Members must
control what is public or shareable.

### 8.17 Membership, billing and settings

Show clearly:

-   Current plan and status.
-   Renewal date where available.
-   Included session entitlement and usage.
-   Payment state.
-   Manage/cancel options.
-   Support and policy links.

No dark patterns, hidden cancellation, false urgency or coercive
renewal. Preserve the existing payment integration only after its
current implementation and platform compliance have been audited.

Settings should include:

-   Profile visibility.
-   Matching consent.
-   Notification categories and quiet hours.
-   Muted users/circles.
-   Blocked users.
-   Data export and deletion request paths.
-   Account security.

### 8.18 Admin and moderation

Admin UI is role-gated and separate from member navigation.

Potential modules, subject to backend support:

-   Session scheduling and resource management.
-   Membership and entitlement support.
-   Member reports and moderation queue.
-   Opportunity review.
-   Mission/circle administration.
-   Notification campaign scheduling with delivery counts.
-   Feature flags and analytics.

Never assume a UI control grants admin authority; every action must be
checked by the server.

------------------------------------------------------------------------

## 9. Component system

### 9.1 Component principles

-   Build reusable primitives before feature-specific components.
-   Use shadcn/ui as an accessible foundation, not as an unmodified
    visual theme.
-   Keep domain components separate from generic UI components.
-   Prefer composition over giant components with many boolean props.
-   Keep server data, UI state and form state separate.
-   Every interactive component must have loading, disabled, error and
    focus states where relevant.

### 9.2 Core primitives

-   `Button`
-   `IconButton`
-   `TextInput`
-   `Textarea`
-   `Select`
-   `Combobox`
-   `Checkbox`
-   `RadioGroup`
-   `Switch`
-   `Tabs`
-   `Badge`
-   `Avatar`
-   `Tooltip`
-   `Popover`
-   `DropdownMenu`
-   `Dialog`
-   `Drawer`
-   `Toast`
-   `Skeleton`
-   `EmptyState`
-   `ErrorState`
-   `Pagination`
-   `ConfirmAction`

### 9.3 Nightclub domain components

-   `AppShell`
-   `DesktopSidebar`
-   `MobileBottomNav`
-   `TopBar`
-   `NextActionCard`
-   `BuilderPersonaSummary`
-   `BuilderCard`
-   `SkillTag`
-   `GoalWeightEditor`
-   `MatchReason`
-   `FindYourFourPanel`
-   `TeamCoverageMap`
-   `ConnectionRequestCard`
-   `ConversationListItem`
-   `MessageComposer`
-   `CircleCard`
-   `CircleMemberList`
-   `MissionCard`
-   `MissionTaskList`
-   `MilestoneTimeline`
-   `ArtifactCard`
-   `ContributionVerificationBadge`
-   `SessionCard`
-   `SessionResourceList`
-   `OpportunityCard`
-   `BuilderPassportTimeline`
-   `MembershipStatusCard`
-   `NotificationPreferenceGroup`

### 9.4 Button variants

**Primary:** filled violet, used for one dominant action per region.

**Secondary:** low-emphasis surface or outline, used for supporting
actions.

**Ghost:** transparent, used for compact navigation and low-emphasis
actions.

**Destructive:** semantic danger colour, used only for destructive
actions with confirmation.

Do not render multiple equally dominant primary buttons in the same card
unless the task genuinely has multiple equivalent outcomes.

### 9.5 Card variants

-   Standard content card: solid elevated surface.
-   Interactive card: subtle hover border and 2--3px lift.
-   Featured card: restrained gradient or ambient glow, limited to one
    or two key modules.
-   Glass overlay: dialogs, popovers and floating surfaces only.
-   Compact list row: for messages, resources and dense data.

------------------------------------------------------------------------

## 10. Icons, imagery and cursor

### 10.1 Icons

Use Lucide React consistently.

Rules:

-   Use one icon family throughout.
-   Default sizes: 16px for inline, 18--20px for navigation, 22--24px
    for prominent actions.
-   Pair unfamiliar icons with text labels.
-   Do not use emoji as the primary icon system.
-   Decorative icons should be hidden from assistive technology.
-   Avoid mixing filled, outlined and custom icon families without a
    clear system.

### 10.2 Imagery

Prefer authentic member work, project screenshots and real community
moments when consented and available.

If no real asset exists:

-   Use a neutral placeholder.
-   Do not fabricate user testimonials, team photos, logos or activity.
-   Do not use generic AI imagery as fake product evidence.
-   Clearly label sample/demo content in development environments.

### 10.3 Cursor

Use native cursor behaviour across the authenticated application.
Optional landing-page cursor accent and magnetic CTA are progressive
enhancements for fine-pointer devices only.

------------------------------------------------------------------------

## 11. Frontend architecture and code organization

Adapt to the existing repository rather than forcing a wholesale
rewrite. If the project has no established structure, use a
feature-oriented organization similar to:

``` text
src/
  app/
    router/
    providers/
    layouts/
    guards/
  components/
    ui/
    feedback/
    navigation/
  features/
    auth/
    onboarding/
    home/
    matching/
    discover/
    connections/
    messages/
    circles/
    missions/
    sessions/
    resources/
    opportunities/
    passport/
    membership/
    settings/
    admin/
  lib/
    api/
    auth/
    analytics/
    permissions/
    validation/
    utils/
  hooks/
  styles/
    tokens.css
    globals.css
  types/
```

Feature folders should own their components, hooks, schemas and API
functions where practical.

### 11.1 TypeScript rules

-   Enable strict TypeScript where repository constraints allow.
-   Avoid `any`; use typed DTOs and narrow unknown data.
-   Distinguish API DTOs from UI view models.
-   Validate untrusted form input.
-   Do not assume optional server fields are always present.
-   Model explicit status unions for requests, missions, sessions and
    membership.
-   Handle unknown enum values safely so older clients do not crash.

### 11.2 State management

Use:

-   TanStack Query for server state, caching, invalidation and
    mutations.
-   React state for local component state.
-   URL search parameters for shareable filters and search state.
-   React Hook Form + Zod for form state and validation.
-   A small global context/store only for truly cross-cutting client
    state such as shell preferences.

Do not duplicate server data in a separate global store without a clear
reason.

### 11.3 API layer

Create a centralized typed API client.

Responsibilities:

-   Base URL from environment configuration.
-   Auth/session attachment according to the audited auth design.
-   Standard error normalization.
-   Request cancellation where appropriate.
-   Typed request and response DTOs.
-   Safe retry policy.
-   Correlation/request ID support if backend provides it.

Do not hardcode production URLs or secrets. Do not put privileged
credentials in the browser bundle.

### 11.4 Authentication and authorization

-   Reuse the existing identity system.
-   Confirm the actual session/token strategy before implementation.
-   Handle expired sessions and revoked access.
-   Enforce authorization on the server.
-   Guard protected routes for UX, but never treat route guards as
    security.
-   Clear sensitive cached data on logout/account switch.
-   Do not leak private data through browser storage, logs or analytics.

### 11.5 Optimistic updates

Use optimistic UI only where rollback is safe and the user receives
clear feedback.

Good candidates may include: - Saving an item. - Muting a feed topic. -
Marking a notification read.

Use server confirmation for: - Connection acceptance. - Circle
membership. - Mission completion. - Contribution verification. -
Subscription state. - Attendance. - Opportunity outcomes.

------------------------------------------------------------------------

## 12. Loading, empty, error and offline states

Every screen must define all relevant states.

### Loading

-   Prefer skeletons that resemble the final layout.
-   Avoid full-page spinners for small updates.
-   Keep navigation responsive while content loads.
-   Do not show fake data as if it were real.

### Empty

Every empty state should explain:

1.  What is empty.
2.  Why it may be empty.
3.  What the member can do next.

Examples: - No eligible matches yet → review profile or wait for
opted-in candidates. - No active mission → explore a relevant mission. -
No conversations → discover builders or review accepted connections. -
No upcoming sessions → view archive/resources. - No opportunities →
adjust goal filters or check later.

### Error

-   Use plain language.
-   Preserve user input where safe.
-   Offer retry when appropriate.
-   Distinguish network, permission, validation and server errors.
-   Never reveal stack traces or internal details to members.

### Offline

-   Show connection status when it affects the task.
-   Cache only appropriate non-sensitive content.
-   Do not imply a message or task update was delivered until confirmed.
-   Provide retry and conflict handling for queued actions.

------------------------------------------------------------------------

## 13. Accessibility and inclusive design

Target WCAG 2.2 AA where practical.

Requirements:

-   Semantic HTML and correct heading hierarchy.
-   Full keyboard navigation.
-   Visible focus indicators.
-   Accessible names for icon-only controls.
-   Sufficient text and control contrast.
-   Labels and helpful error descriptions for form fields.
-   Dialog focus management and focus restoration.
-   No hover-only essential content.
-   Reduced-motion support.
-   Screen-reader announcements for important async state changes.
-   Touch-friendly controls.
-   Captions or transcripts for hosted learning sessions where
    available.
-   Clear language; avoid unexplained product jargon.

The orbital network, 3D scenes and animated progress must always have a
readable non-animated equivalent.

------------------------------------------------------------------------

## 14. Performance and quality

### 14.1 Performance principles

-   Prioritize fast first render and useful content.
-   Lazy-load routes and non-critical modules.
-   Lazy-load 3D and heavy media.
-   Optimize images and use responsive image sizes.
-   Avoid unnecessary dependencies.
-   Split large feature bundles.
-   Prevent layout shifts with reserved media dimensions.
-   Use virtualization only when lists are genuinely large.
-   Debounce search input appropriately.
-   Avoid excessive animation and expensive blur on large surfaces.

### 14.2 Performance checks

Measure real user experience, not only local development speed.

Track: - Largest Contentful Paint. - Interaction to Next Paint. -
Cumulative Layout Shift. - JavaScript bundle size. - API request latency
and failure rate. - Image and 3D asset weight.

Set project budgets after measuring the existing deployment and target
devices. Do not invent performance results.

### 14.3 Testing

Required test layers:

-   Unit tests for utility functions, formatters and validation.
-   Component tests for controls and important states.
-   Integration tests for API-driven feature flows.
-   End-to-end tests for registration, onboarding, matching,
    connections, messaging, missions, sessions and membership.
-   Accessibility checks for navigation, dialogs and forms.
-   Responsive checks across mobile, tablet and desktop widths.
-   Regression tests for role/entitlement-sensitive UI.

Important failure scenarios:

-   Expired session.
-   Member without active entitlement.
-   Match inventory empty.
-   Introduction declined.
-   User blocked between request and delivery.
-   Message send failure.
-   Mission update conflict.
-   Session link unauthorized.
-   Payment status pending or failed.
-   Opportunity removed after it was saved.
-   Network loss during form submission.

------------------------------------------------------------------------

## 15. Privacy, safety and trust in the UI

-   Hide personal contact details by default.
-   Do not imply connection acceptance grants access to phone/email.
-   Provide block and report actions in member discovery and messaging
    contexts.
-   Respect blocks across search, recommendations, conversations and
    notifications.
-   Make visibility and matching consent understandable.
-   Allow members to pause, mute and leave.
-   Avoid public shaming and popularity leaderboards.
-   Do not expose private feedback to the wrong audience.
-   Do not claim a contribution is verified unless the server says so.
-   Do not show confidential project artifacts without explicit
    visibility permission.
-   Avoid sensitive message content in lock-screen notifications.
-   Provide a clear path to account/data deletion according to policy.

Safety controls must never be hidden behind a paid feature.

------------------------------------------------------------------------

## 16. Notifications and in-product feedback

The UI must reflect the notification priority model:

  -----------------------------------------------------------------------
  Priority                Example                 UI treatment
  ----------------------- ----------------------- -----------------------
  Transactional           Security, billing and   Clear, factual,
                          payment status          persistent where
                                                  necessary

  High                    Accepted connection,    In-app notification and
                          direct message, task    opted-in push
                          review                  

  Medium                  Relevant match, session Contextual in-app
                          reminder, opportunity   notification or
                                                  opted-in push

  Low                     Passive reactions and   Digest or notification
                          general activity        center
  -----------------------------------------------------------------------

Requirements:

-   Direct deep link to the relevant conversation, task, event or
    opportunity.
-   Respect category preferences and quiet hours.
-   Deduplicate repeated events.
-   Show notification settings and mute controls.
-   Do not use generic guilt-based "come back" messages.
-   Default cap in the product blueprint: two non-essential push
    notifications per day; transactional/security events are handled
    separately.
-   Ask for push permission only after explaining the value in context.
-   Distinguish sent, delivered, read and acted-on states only when
    backend evidence supports them.

Toasts should confirm an action, not replace important persistent
information.

------------------------------------------------------------------------

## 17. Analytics and instrumentation

Use the event taxonomy defined by the product blueprint. Frontend events
should include, where applicable:

-   `profile_started`
-   `profile_completed`
-   `goal_weights_updated`
-   `match_impression`
-   `match_reason_viewed`
-   `introduction_requested`
-   `introduction_accepted`
-   `introduction_declined`
-   `message_sent`
-   `first_qualified_conversation`
-   `circle_created`
-   `mission_started`
-   `milestone_verified`
-   `artifact_published`
-   `session_attended`
-   `opportunity_applied`
-   `opportunity_response_received`
-   `notification_sent`
-   `notification_opened`
-   `notification_qualified_action`
-   `subscription_renewed`
-   `subscription_cancelled`
-   `report_submitted`
-   `block_created`

Rules:

-   Follow consent, retention and data-minimization policies.
-   Use pseudonymous analytics identifiers.
-   Never log private message bodies or personal contact fields in
    generic analytics.
-   Do not infer product success from notification opens alone.
-   The North Star is weekly meaningful collaborators, as defined in the
    product blueprint.
-   Track countermetrics such as reports, blocks, declines, opt-outs,
    overload and cancellations.

------------------------------------------------------------------------

## 18. Feature delivery and implementation phases

### Phase 0 --- Existing-system audit

-   Inspect current frontend and Laravel backend.
-   Confirm auth, membership, payment, session, email and admin flows.
-   Document API boundaries and current UI capabilities.
-   Establish design tokens and security baseline.

**Exit:** known integration contracts and backwards-compatible
implementation plan.

### Phase 1 --- Identity, matching and first introductions

-   Authentication and protected shell.
-   Builder Persona onboarding.
-   Goal weights and editable skills.
-   Discover and reciprocal match explanations.
-   Find Your Four.
-   Connection requests and privacy-safe 1:1 chat.
-   Notification preferences.
-   Admin review tools, if supported by backend.

**Exit:** real mutual introductions and qualified conversations without
contact-data leakage.

### Phase 2 --- Collaborate and ship

-   Circles.
-   Missions and tasks.
-   Milestones and artifacts.
-   Builder Passport.
-   Session integration and structured collaboration feedback.

**Exit:** members ship verifiable artifacts together.

### Phase 3 --- Opportunities and personalization

-   Startup, career and freelance pathways.
-   Trusted opportunity listings.
-   Search improvements.
-   Notification tuning.
-   Measured recommender improvements.

**Exit:** traceable interviews, customer pilots, paid gigs or startup
milestones originating from platform activity.

### Phase 4 --- Native app optimization

-   Flutter iOS/Android production experience.
-   Store-compliant entitlements.
-   Push and deep links.
-   Mobile accessibility.
-   Offline-friendly UX.
-   Analytics, performance and safety hardening.

------------------------------------------------------------------------

## 19. Definition of done for every frontend feature

A feature is not complete until it has:

-   [ ] A clear user job and target persona.
-   [ ] A defined primary action.
-   [ ] Trigger, action, meaningful reward, investment and next trigger.
-   [ ] Desktop and mobile responsive states.
-   [ ] Loading, empty, success, error and offline states where
    relevant.
-   [ ] Permission and entitlement handling.
-   [ ] Privacy, consent, block, report and opt-out behaviour where
    relevant.
-   [ ] Keyboard and screen-reader support.
-   [ ] Reduced-motion behaviour.
-   [ ] Typed API contracts based on inspected backend behaviour.
-   [ ] Analytics events and guardrail metrics.
-   [ ] Unit/component/integration or end-to-end coverage appropriate to
    risk.
-   [ ] No fabricated users, activity, match results, progress or social
    proof.
-   [ ] No hidden phone/email sharing.
-   [ ] No client-side authorization assumptions.
-   [ ] No manipulative engagement patterns.

------------------------------------------------------------------------

## 20. Design and implementation references

Use these as implementation references, not as templates to copy
wholesale:

-   Motion for React: https://motion.dev/docs/react
-   shadcn/ui: https://ui.shadcn.com/
-   Lucide icons: https://lucide.dev/icons/
-   Aceternity Lamp Effect:
    https://ui.aceternity.com/components/lamp-effect
-   Magic UI Bento Grid:
    https://magicui.design/docs/components/bento-grid
-   React Bits: https://www.reactbits.dev/
-   Spline: https://spline.design/
-   Rive: https://rive.app/

The component foundation should remain consistent. Use shadcn/ui for
accessible primitives, Motion for animation, and selected individual
effects from other libraries. Do not combine multiple component
libraries as competing design systems.

------------------------------------------------------------------------

## 21. Final frontend direction

Nightclub should feel like a **quietly alive builder space**: premium,
dark, focused and welcoming.

The visual system is:

-   Obsidian and graphite foundations.
-   Restrained violet as the primary accent.
-   Subtle blue as a secondary accent.
-   Selective liquid glass for floating layers.
-   Bento layouts for the home dashboard.
-   One recognizable 3D brand emblem.
-   A restrained builder-network visualization for Find Your Four.
-   Balanced Motion transitions and tactile feedback.
-   Fixed desktop sidebar and five-item mobile navigation.
-   Readable, solid workspaces for messages, missions, resources and
    sessions.

The product system is:

**Understand me → Find my people → Build together → Prove my work →
Unlock my next opportunity.**

The frontend must make this journey feel natural without turning
Nightclub into a noisy social feed. Every visual effect, notification,
interaction and screen must serve a real member outcome.

**Final principle: Make Nightclub a place people are glad to return to
because meaningful work is happening---not because the interface is
trying to keep them scrolling.**
