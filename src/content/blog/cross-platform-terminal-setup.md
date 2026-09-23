---
slug: cross-platform-terminal-setup
title: A Cross-Platform Terminal Setup Built on a Shared Mental Model
excerpt: A practical terminal setup that keeps projects, tasks, and commands familiar across Windows and macOS.
category: Engineering
tags: [terminal, productivity, development, backend]
devToTags: [terminal, productivity, development, backend]
publishedAt: 2026-09-08T16:45:22Z
updatedAt: 2026-09-08T16:47:57Z
status: unpublished
syncToDev: false
devToId: 4608211
coverImage: https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/blog/cross-platform-terminal-setup/cover-v1.png
coverImageAlt: Retro terminal workspaces connected through a shared command-line structure
---

> I use a Windows laptop at work and a MacBook at home.
> I do not need their terminals to behave identically, but I need them to organize my work in the same way.

My work laptop uses `WezTerm` with `PowerShell` or `Nushell`.
My MacBook uses `Ghostty` with `tmux` and either `zsh` or `Nushell`.
`Neovim` is my editor on both machines.

Making every shortcut identical would require extra configuration without solving the main problem.
What matters is giving projects, tasks, and commands predictable places.

**The tools can differ as long as the workflow remains familiar.**

## One structure across both machines

I organize my terminal workspace around three levels:

| Level | Purpose | Example |
|---|---|---|
| Project workspace | Keep related work together | application project |
| Window or tab | Separate tasks and contexts | editor, Git, server, logs |
| Pane | Show related commands at the same time | server beside test output |

On the Mac, tmux adds a session around this structure.
Each session contains windows, and each window contains one or more panes.
A session can be detached and reattached while its programs continue running.

On Windows, WezTerm handles tabs and panes directly.
Although the tools differ, I can organize both environments using the same hierarchy.

A typical project session on the Mac begins with:

```bash
cd path/to/project
tmux new-session -A -s project
nvim .
```

From there, I can keep the editor in one window, Git commands in another, the development server in a third, and tests or logs in a fourth.

I reserve panes for commands that belong to the same immediate task.
A server and its logs make sense together, while an editor and an unrelated deployment session usually deserve separate windows.

> **Working rule:** Use a window for a different context.
> Use a pane when two views need to remain visible together.

## Give each tool one clear responsibility

This structure stays manageable because each tool has a focused role:

- **Ghostty and WezTerm** provide the terminal interface.
- **tmux** manages detachable sessions, windows, and panes on the Mac.
- **PowerShell, Nushell, and zsh** provide the command-line environment.
- **Neovim** handles code editing.

These boundaries also make problems easier to diagnose.
The terminal, multiplexer, and shell are separate layers, so a failure in one does not necessarily mean the others are broken.

Understanding which layer owns a behavior is more useful than accumulating fixes across configuration files.

## Match actions instead of keystrokes

Switching between operating systems was challenging at first.
The turning point was applying the same principle to shortcuts: keep the actions consistent even when the key sequences differ.

| Action | Windows with WezTerm | Mac with tmux |
|---|---|---|
| Split right | `Ctrl-Shift-D` | `Ctrl-b`, then `\|` |
| Split down | `Ctrl-Shift-S` | `Ctrl-b`, then `-` |
| Move between panes | `Alt-Arrow` | `Ctrl-b`, then `h/j/k/l` |
| Resize a pane | `Ctrl-Shift-Arrow` | `Ctrl-b`, then `H/J/K/L` |
| Create a window or tab | `Ctrl-Shift-T` | `Ctrl-b`, then `c` |
| Close a pane | `Ctrl-Shift-W` | `Ctrl-b`, then `x` |
| Reload the configuration | `Ctrl-Shift-R` | `Ctrl-b`, then `r` |

The physical shortcuts differ, but their purposes remain consistent.
I create a window when I need another task context, split a pane when I need a related view, and resize the layout when it no longer fits the work.

tmux uses a prefix model, so most commands begin with `Ctrl-b`.
This approach is more dependable than forcing every WezTerm shortcut through Ghostty and into tmux.
Some direct key combinations depend on how the outer terminal encodes and forwards them, which makes exact shortcut parity fragile.

**A reliable two-step shortcut is better than a clever shortcut that works with only one combination of terminal, shell, and configuration.**

---

My setup respects the differences between Windows and macOS while giving both environments a familiar structure.
I can move between machines and focus on the work because the editor, server, tests, and logs still have predictable places.

> **Key takeaway:** Standardize the mental model first.
> Standardize individual shortcuts only when they remain reliable.
