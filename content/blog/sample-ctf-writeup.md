---
title: "CTF Writeup: Reversing a Simple crackme (Template)"
date: "2026-06-10"
category: "CTF Writeup"
excerpt: "A template writeup showing the format I use — recon, analysis, exploitation, and the flag. Replace this with your real challenge writeups."
tags: ["ctf", "reverse-engineering", "ghidra"]
---

> This is a sample post so you can see how a CTF writeup looks on the site.
> Duplicate this file, rename it, and write your real challenges the same way.

## Challenge

**Category:** Reverse Engineering · **Points:** 200

We're given a single ELF binary, `crackme`, that asks for a password and prints
`Access granted` on the right input. Goal: recover the password (the flag).

## Recon

First, basic triage:

```bash
file crackme
# crackme: ELF 64-bit LSB pie executable, x86-64, dynamically linked, not stripped

strings crackme | grep -i flag
```

Not stripped — good news. Time to open it in Ghidra.

## Analysis

In `main`, the input is compared byte-by-byte against a value built at runtime:

```c
for (i = 0; i < len; i++) {
    if ((input[i] ^ 0x42) != key[i]) {
        puts("Access denied");
        return 1;
    }
}
puts("Access granted");
```

Each input byte is XOR'd with `0x42` and compared to a hardcoded `key` array. So
the password is simply `key[i] ^ 0x42` for each byte.

## Solution

```python
key = [0x26, 0x31, 0x36, 0x21]  # bytes pulled from Ghidra
print("".join(chr(b ^ 0x42) for b in key))
```

Running it reconstructs the password, and feeding it back to the binary prints
`Access granted`.

## Flag

```
flag{x0r_is_not_encryption}
```

## Takeaway

XOR against a constant is obfuscation, not encryption — once you see the loop,
the key falls out immediately. The real skill here is reading decompiled output
quickly and trusting it.
