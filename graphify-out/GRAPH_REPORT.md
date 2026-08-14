# Graph Report - .  (2026-08-14)

## Corpus Check
- 92 files · ~92,658 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 501 nodes · 787 edges · 29 communities (26 shown, 3 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Marketing Homepage Components
- Admin & User Data Layer
- Admin Dashboard & Conversations
- Production Dependencies
- Build Tools & Dev Config
- Product Documentation
- Full-Page Screenshot Analysis
- Core Routing & Internationalization
- TypeScript Compiler Config
- Hero Section UI
- Backend & Security Architecture
- Supabase Database Migrations
- Node Build Configuration
- Favicon Brand Identity
- Global Component Types
- React Logo Asset
- UI Component Types
- Theme Hook
- i18n Internationalization
- MCP Server Config

## God Nodes (most connected - your core abstractions)
1. `SectionWrapper()` - 21 edges
2. `compilerOptions` - 19 edges
3. `Quantium Crew Landing Page (Light Mode Full-Page Screenshot)` - 15 edges
4. `cn()` - 14 edges
5. `Button` - 10 edges
6. `Conversation` - 9 edges
7. `Homepage Accessibility Snapshot (13:47)` - 9 edges
8. `useAuth()` - 8 edges
9. `Services / Divisions Module` - 8 edges
10. `4U Rack Elevation Diagram` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Six-Phase Methodology (shipped)` --semantically_similar_to--> `How We Work (5-Step Process)`  [INFERRED] [semantically similar]
  .playwright-mcp/page-2026-08-13T13-47-57-056Z.yml → .trae/documents/quantium_crew_prd.md
- `Supabase Backend (Data, Auth, Storage)` --conceptually_related_to--> `No Backend / No Data Model`  [INFERRED]
  README.md → .trae/documents/quantium_crew_technical_architecture.md
- `Agent with Personality and Memory` --semantically_similar_to--> `Anonymous Client Chat Session`  [INFERRED] [semantically similar]
  .superpowers/brainstorm/49827-1781569779/content/vida-propia.html → README.md
- `Reactive Agent` --semantically_similar_to--> `SECURITY DEFINER Welcome-Message Trigger`  [INFERRED] [semantically similar]
  .superpowers/brainstorm/49827-1781569779/content/vida-propia.html → README.md
- `Option C: Quantium Crew as the Modeled Company` --conceptually_related_to--> `Quantium Crew Website`  [INFERRED]
  .superpowers/brainstorm/49827-1781569779/content/empresa-areas.html → .trae/documents/quantium_crew_prd.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Four Divisions Mapped to a Rack Elevation (Floor to Cloud)** — _trae_documents_quantium_crew_prd_quantium_dev, _trae_documents_quantium_crew_prd_quantium_systems, _trae_documents_quantium_crew_prd_quantium_support_plus, _trae_documents_quantium_crew_prd_quantium_install, _playwright_mcp_page_2026_08_13t13_47_57_056z_rack_elevation_metaphor [INFERRED 0.85]
- **Database-Enforced Authorization Flow** — readme_rls_permission_model, readme_admin_role_app_metadata, readme_anonymous_client_chat_session, readme_welcome_message_trigger, readme_consolidated_rls_migration, readme_anonymous_signin_dashboard_setting [EXTRACTED 1.00]
- **Combinable Agent Autonomy Traits** — _superpowers_brainstorm_49827_1781569779_content_vida_propia_reactive_agent, _superpowers_brainstorm_49827_1781569779_content_vida_propia_proactive_alert_agent, _superpowers_brainstorm_49827_1781569779_content_vida_propia_autonomous_routine_agent, _superpowers_brainstorm_49827_1781569779_content_vida_propia_persona_memory_agent [EXTRACTED 1.00]
- **Quantium Four-Division Service Model** — full_light_service_quantium_dev, full_light_service_quantium_systems, full_light_service_quantium_support, full_light_service_quantium_install [EXTRACTED 1.00]
- **Trust and Credibility Signal Stack** — full_light_hero_credential_strip, full_light_tech_stack_strip, full_light_partners_dark_band, full_light_stats_band, full_light_testimonials_section, full_light_expertos_en_campo_card [INFERRED 0.85]
- **Engineering-Document Visual Language** — full_light_blueprint_technical_aesthetic, full_light_mono_micro_label_system, full_light_rack_elevation_diagram, full_light_diagnostic_form_card, full_light_light_neutral_cyan_palette [INFERRED 0.85]
- **Four-Division Technology Stack (Floor to Cloud)** — hero_new_layer_floor, hero_new_layer_network, hero_new_layer_server, hero_new_layer_cloud, hero_new_stat_divisiones [EXTRACTED 1.00]
- **Hero Conversion Path Elements** — hero_new_empezar_cta, hero_new_primary_cta, hero_new_secondary_cta, hero_new_chat_widget [INFERRED 0.85]
- **Credibility Signal Cluster** — hero_new_stat_operando_desde, hero_new_stat_divisiones, hero_new_stat_respuesta, hero_new_blueprint_aesthetic [INFERRED 0.75]
- **Hexagon, Core and Spokes Compose the Icon Geometry** — public_favicon_hexagon_frame, public_favicon_core_node, public_favicon_connector_spokes, public_favicon_brand_gradient [EXTRACTED 1.00]
- **React Brand Identity Expressed as a Single-Path SVG Mark** — src_assets_react_logo, src_assets_react_atom_orbital_motif, src_assets_react_cyan_brand_color, src_assets_react_iconify_logos_set [INFERRED 0.85]

## Communities (29 total, 3 thin omitted)

### Community 0 - "Marketing Homepage Components"
Cohesion: 0.06
Nodes (47): Empty(), languages, Navbar(), Contact(), CTA(), lineItems, FeaturedTestimonials(), Hero() (+39 more)

### Community 1 - "Admin & User Data Layer"
Cohesion: 0.06
Nodes (52): statusConfig, StatusFilter, TestimonialManager(), TestimonialManagerProps, TestimonialCarousel(), ClientChat(), toast(), TurnstileCaptcha() (+44 more)

### Community 2 - "Admin Dashboard & Conversations"
Cohesion: 0.07
Nodes (40): AdminDashboard(), AdminDashboardProps, statCards, ChatView(), ChatViewProps, ClientInfoPanel(), ClientInfoPanelProps, PRESET_TAGS (+32 more)

### Community 3 - "Production Dependencies"
Cohesion: 0.05
Nodes (39): clsx, framer-motion, i18next, i18next-browser-languagedetector, lucide-react, @marsidev/react-turnstile, dependencies, clsx (+31 more)

### Community 4 - "Build Tools & Dev Config"
Cohesion: 0.05
Nodes (37): autoprefixer, babel-plugin-react-dev-locator, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies (+29 more)

### Community 5 - "Product Documentation"
Cohesion: 0.07
Nodes (36): Homepage Accessibility Snapshot (13:47), Strategic Technology Partners Marquee, Placeholder Footer Contact Details, Six-Phase Methodology (shipped), Rack Elevation Metaphor (4U/3U/2U/1U), Shipped Site Route Map, Spec-Plate Animated Stats, Work-Order Styled CTA (+28 more)

### Community 6 - "Full-Page Screenshot Analysis"
Cohesion: 0.09
Nodes (32): Blueprint / Technical Drawing Aesthetic, Repeated Consultation Conversion Funnel, Diagnostic Request Card - 'Deja de parchar. Empieza a disenar.', Ecosistema Tecnologico Feature Card (dark gradient bento tile), Expertos en Campo Certification Tag Card, Final CTA Banner - '¿Listo para transformar tu tecnologia?' / Empezar ahora, Floating Chat Widget Button (bottom-right cyan bubble), Footer (Servicios / Empresa / Contactanos columns, social icons, address) (+24 more)

### Community 7 - "Core Routing & Internationalization"
Cohesion: 0.10
Nodes (17): App(), Footer(), socialLinks, ProtectedRoute(), iconMap, ToastContainer(), ToastItem, ToastStore (+9 more)

### Community 8 - "TypeScript Compiler Config"
Cohesion: 0.07
Nodes (27): DOM, DOM.Iterable, ES2020, ./node_modules/@types, src, ./src/types, compilerOptions, allowImportingTsExtensions (+19 more)

### Community 9 - "Hero Section UI"
Cohesion: 0.10
Nodes (26): Technical Blueprint Visual Aesthetic, QuantiumCrew Brand Logo, Floating Chat Widget, Dual CTA Visual Hierarchy Pattern, Empezar Navbar CTA Button, Eyebrow: DEL CABLEADO A LA NUBE · PANAMÁ, Floor-to-Cloud Full Stack Metaphor, Headline: No arreglamos tecnología. La diseñamos. (+18 more)

### Community 10 - "Backend & Security Architecture"
Cohesion: 0.16
Nodes (18): Agent Autonomy Spectrum, Autonomous Agent with Routines, Agent with Personality and Memory, Proactive Agent with Alerts, Reactive Agent, No User Authentication Required, Admin Role via app_metadata Claim, Anonymous Client Chat Session (+10 more)

### Community 11 - "Supabase Database Migrations"
Cohesion: 0.25
Nodes (4): auth.users, public.conversations, public.messages, public.testimonials

### Community 12 - "Node Build Configuration"
Cohesion: 0.22
Nodes (8): vite.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 13 - "Favicon Brand Identity"
Cohesion: 0.46
Nodes (8): Cyan-to-Violet Brand Gradient, Four Radiating Connector Spokes, Central Core Node Disc, Dark Rounded-Square Backdrop, Dark-Theme Visual Identity, Hexagonal Outline Frame, Quantium Crew Favicon Mark, Network Hub Brand Metaphor

### Community 14 - "Global Component Types"
Cohesion: 0.29
Nodes (7): ButtonProps, CardProps, @/components/ui/Button, @/components/ui/Card, @/components/ui/SectionWrapper, SectionWrapperProps, *.tsx

### Community 15 - "React Logo Asset"
Cohesion: 0.40
Nodes (6): Atom Orbital Motif (Nucleus and Three Ellipses), React Cyan Brand Color #00D8FF, Decorative Image Accessibility Contract (aria-hidden, role=img), Iconify Logos Icon Set, React Logo Mark (SVG), Vite React Starter Template Asset

### Community 16 - "UI Component Types"
Cohesion: 0.40
Nodes (4): @/components/ui, @/components/ui/Button, @/components/ui/Card, @/components/ui/SectionWrapper

## Knowledge Gaps
- **165 isolated node(s):** `supabase`, `name`, `private`, `version`, `type` (+160 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Build Tools & Dev Config` to `Production Dependencies`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `SectionWrapper()` connect `Marketing Homepage Components` to `Admin & User Data Layer`, `Core Routing & Internationalization`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `supabase`, `name`, `private` to the rest of the system?**
  _165 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Marketing Homepage Components` be split into smaller, more focused modules?**
  _Cohesion score 0.055379746835443035 - nodes in this community are weakly interconnected._
- **Should `Admin & User Data Layer` be split into smaller, more focused modules?**
  _Cohesion score 0.06041986687147977 - nodes in this community are weakly interconnected._
- **Should `Admin Dashboard & Conversations` be split into smaller, more focused modules?**
  _Cohesion score 0.06938775510204082 - nodes in this community are weakly interconnected._
- **Should `Production Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._