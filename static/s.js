let a = ```   File  Edit  View  Search  Run  Debug  Options                          Help 
┌───────────────────────────────── Untitled ───────────────────────────────┤↑├─┐
│                                                                              ↑
│                                                                             
│                                                                              ░
│           ┌────────────────────────────────────────────────────────┐         ░
│           │                                                        │        ░
│           │                Welcome to MS-DOS QBasic                │        ░
│           │                                                        │        ░
│           │     Copyright (C) Microsoft Corporation, 1987-1992.    │        ░
│           │                  All rights reserved.                  │        ░
│           │                                                        │        ░
│           │       <
Press Enter to see the Survival Guide >        │        ░
│           ├────────────────────────────────────────────────────────┤        ░
│           │         < Press ESC to clear this dialog box >         │        ░
│           └────────────────────────────────────────────────────────┘        ░
│                                                                            ░
│                                                                              ░
│                                                                              ░
│                                                                              ↓
│← ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░→│
├───────────────────────────────── Immediate ──────────────────────────────────┤
│                                                                              │
│                                                                              │
F1=Help   Enter=Execute   Esc=Cancel   Tab=Next Field   Arrow=Next Item       ```

a = a.replaceAll(" ","\u00A0")
document.getElementsByTag("p")[0].innerHTML = a
