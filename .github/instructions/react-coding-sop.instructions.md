---
description: "Gunakan saat membuat atau mengubah kode React di src: aturan pemisahan Page, Component, custom hook, Service, Store Zustand, dan validasi schema."
applyTo: "src/**"
---

# React Coding SOP

Ikuti SOP ini saat mengerjakan aplikasi React dalam workspace ini.

## Page

Page hanya menyusun tampilan dengan menggunakan custom hook untuk logic dan component untuk tampilan.

Page dilarang:
- Melakukan fetch API atau mengimpor axios secara langsung.
- Menulis business logic atau validasi manual.
- Membuat Zustand store.
- Menggunakan `useEffect`, `useState`, atau `useReducer` secara langsung.

## Component

Component berfokus pada tampilan dan dilarang:
- Melakukan fetch API atau mengimpor axios secara langsung.
- Melakukan validasi manual.
- Menangani business logic yang berat.

## Custom Hook

Custom hook adalah tempat untuk logic UI. Hook boleh menggunakan `useState`, `useEffect`, dan `useReducer`, serta memanggil service dan store.

## Service

Service menangani logic API. Service boleh menggunakan axios atau fetch dan melakukan mapping dasar request/response. Service tidak boleh berisi JSX atau logic tampilan.

## Store

Global state wajib menggunakan Zustand. Pemanggilan `create` dari Zustand hanya boleh berada di:
- `src/stores`
- `src/features/**/stores`

## Validation

Validasi form wajib menggunakan schema, misalnya Zod, Yup, atau resolver React Hook Form. Validasi manual di Page atau Component dilarang.

## Penerapan

- Pertahankan pemisahan tanggung jawab ini saat menambah atau mengubah fitur.
- Ikuti struktur dan pola yang sudah ada di proyek jika tidak bertentangan dengan SOP.
- Tambahkan dependency atau lapisan arsitektur hanya jika memang diperlukan oleh fitur.
