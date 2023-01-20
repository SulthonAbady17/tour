# User

`localhost:3000/api/users`
1. **GET** Tampilkan semua data user
  - Response :
    - _404_ Data user kosong/tidak ditemukan
    - _200_ Menampilkan seluruh data user



`localhost:3000/api/users/{userId}`
1. **GET** Tampilkan satu data user
  - `{userId}` input ID user
  - Response :
    - _404_ Data user tidak ditemukan
    - _200_ Data user ditemukan

2. **PATCH** Edit satu data user
  - `{userId}` input ID user
  - Request :
    - _firstName_ Tipe data harus string, tanpa spasi, dan alphabet
    - _lastName_ Tipe data harus string, tanpa spasi, dan alphabet
    - _fullName_ Tipe data haeus string, dan alphabet
    - _citizen_ Data yang dikirim salah satu dari "WNI" atau "WNA"
    - _nik_ Tipe data harus string, numeric, dan harus 16 digit
    - _address_ Tipe data harus string
    - _date_ Tipe data string, dan formatnya "tahun-bulan-tanggal", contoh _2002-12-12_
    - _phone_ Tipe data string, dan numeric
    - _email_ Tipe data string, tanpa spasi, dan berformat email
    - _password_ Tipe data string, dan minimal 8 digit
    - _role_ Data yang dikirim salah satu dari "user" atau "admin"
  - Response :
    - _404_ Data user tidak ditemukan
    - _400_ Data yang dikirim tidak sesuai
    - _200_ Berhasil mengubah data user
3. **DELETE**
  - `{userId}` input ID user
  - Response :
    - _404_ Data user tidak ditemukan
    - _200_ Berhasil menghapus user
