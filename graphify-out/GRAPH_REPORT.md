# Graph Report - src  (2026-09-07)

## Corpus Check
- Corpus is ~30,839 words - fits in a single context window. You may not need a graph.

## Summary
- 482 nodes · 980 edges · 29 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- About Components
- Layout and Projects
- Alert Dialog
- Application Shell
- Input and Sidebar
- Menu Bar
- Toast Notifications
- Contact Forms
- Button and Scroller
- Command Menu
- Form Components
- Charts
- Hero6 Design System
- Context Menu
- Dropdown Menu
- Text Effects
- Breadcrumbs
- Drawer
- Navigation Menu
- Select Controls
- Toggles
- Alerts
- Animated Sections
- OTP Input
- Accordion
- Avatar
- Tabs

## God Nodes (most connected - your core abstractions)
1. `cn()` - 252 edges
2. `FadeIn()` - 10 edges
3. `buttonVariants` - 9 edges
4. `Button` - 9 edges
5. `designer` - 9 edges
6. `useIntersectionObserver()` - 8 edges
7. `Project` - 8 edges
8. `Hero6 Brutalist Style Guide` - 8 edges
9. `PageTransition()` - 7 edges
10. `MainLayout()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `GridContainer()` --calls--> `cn()`  [EXTRACTED]
  components/layout/GridContainer.tsx → lib/utils.ts
- `Section()` --calls--> `cn()`  [EXTRACTED]
  components/layout/Section.tsx → lib/utils.ts
- `BrutalistNav()` --calls--> `cn()`  [EXTRACTED]
  components/navigation/BrutalistNav.tsx → lib/utils.ts
- `AccordionItem` --calls--> `cn()`  [EXTRACTED]
  components/ui/accordion.tsx → lib/utils.ts
- `AccordionTrigger` --calls--> `cn()`  [EXTRACTED]
  components/ui/accordion.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (29 total, 0 thin omitted)

### Community 0 - "About Components"
Cohesion: 0.07
Nodes (34): ServiceCard(), ServiceCardProps, ServicesGrid(), TestimonialSection(), defaultVariants, FadeIn(), FadeInProps, FadeInStagger() (+26 more)

### Community 1 - "Layout and Projects"
Cohesion: 0.06
Nodes (31): GridContainer(), GridContainerProps, Section(), SectionProps, ProjectCard(), ProjectCardProps, ProjectGrid(), ProjectGridProps (+23 more)

### Community 2 - "Alert Dialog"
Cohesion: 0.07
Nodes (35): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+27 more)

### Community 3 - "Application Shell"
Cohesion: 0.07
Nodes (19): App(), queryClient, SkipToContent(), Toaster(), ToasterProps, getAllProjects(), Hero10(), Hero1() (+11 more)

### Community 4 - "Input and Sidebar"
Cohesion: 0.07
Nodes (30): Input, Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent (+22 more)

### Community 5 - "Menu Bar"
Cohesion: 0.10
Nodes (28): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+20 more)

### Community 6 - "Toast Notifications"
Cohesion: 0.12
Nodes (24): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+16 more)

### Community 7 - "Contact Forms"
Cohesion: 0.11
Nodes (16): ContactForm(), ContactFormData, contactSchema, Badge(), BadgeProps, badgeVariants, Card, CardContent (+8 more)

### Community 8 - "Button and Scroller"
Cohesion: 0.12
Nodes (10): Button(), ButtonProps, shapes, sizes, types, ScrollerProps, TOverflowType, bars (+2 more)

### Community 9 - "Command Menu"
Cohesion: 0.12
Nodes (15): Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+7 more)

### Community 10 - "Form Components"
Cohesion: 0.19
Nodes (12): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+4 more)

### Community 11 - "Charts"
Cohesion: 0.25
Nodes (9): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload(), THEMES (+1 more)

### Community 12 - "Hero6 Design System"
Cohesion: 0.18
Nodes (11): Border System, Brutalist Design Philosophy, Color Palette, Component Patterns, Design System Tokens, Hero6 Brutalist Style Guide, Interactive States, Layout Grid (+3 more)

### Community 13 - "Context Menu"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 14 - "Dropdown Menu"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 15 - "Text Effects"
Cohesion: 0.22
Nodes (8): AnimationComponent, defaultContainerVariants, defaultItemVariants, defaultStaggerTimes, PresetType, presetVariants, TextEffect(), TextEffectProps

### Community 16 - "Breadcrumbs"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 17 - "Drawer"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 18 - "Navigation Menu"
Cohesion: 0.29
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 19 - "Select Controls"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 20 - "Toggles"
Cohesion: 0.43
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 21 - "Alerts"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 22 - "Animated Sections"
Cohesion: 0.40
Nodes (3): AnimatedSectionsProps, defaultSections, SectionData

### Community 23 - "OTP Input"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 24 - "Accordion"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 25 - "Avatar"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 26 - "Tabs"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **79 isolated node(s):** `queryClient`, `ServiceCardProps`, `FadeInProps`, `defaultVariants`, `FadeInStaggerProps` (+74 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 100 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Menu Bar` to `About Components`, `Layout and Projects`, `Alert Dialog`, `Input and Sidebar`, `Toast Notifications`, `Contact Forms`, `Command Menu`, `Form Components`, `Charts`, `Context Menu`, `Dropdown Menu`, `Text Effects`, `Breadcrumbs`, `Drawer`, `Navigation Menu`, `Select Controls`, `Toggles`, `Alerts`, `OTP Input`, `Accordion`, `Avatar`, `Tabs`?**
  _High betweenness centrality (0.656) - this node is a cross-community bridge._
- **Why does `FadeIn()` connect `About Components` to `Layout and Projects`, `Alert Dialog`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Button` connect `Alert Dialog` to `About Components`, `Input and Sidebar`, `Menu Bar`, `Contact Forms`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `queryClient`, `ServiceCardProps`, `FadeInProps` to the rest of the system?**
  _79 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `About Components` be split into smaller, more focused modules?**
  _Cohesion score 0.07205513784461152 - nodes in this community are weakly interconnected._
- **Should `Layout and Projects` be split into smaller, more focused modules?**
  _Cohesion score 0.06313497822931785 - nodes in this community are weakly interconnected._
- **Should `Alert Dialog` be split into smaller, more focused modules?**
  _Cohesion score 0.06707317073170732 - nodes in this community are weakly interconnected._