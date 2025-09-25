# مشروع 24 - حي الزهراء | Backend API

## 🚀 الإعداد والتشغيل

### المتطلبات
- Node.js (v18 أو أحدث)
- MongoDB (محلي أو سحابي)
- npm أو yarn

### خطوات التثبيت

1. **تثبيت المكتبات**
```bash
npm install
```

2. **إعداد متغيرات البيئة**
أنشئ ملف `.env` في مجلد `backend` مع المحتوى التالي:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jeddah-real-estate-db
JWT_SECRET=jeddah_real_estate_super_secret_key_2024_project24
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
```

3. **إعداد قاعدة البيانات**
```bash
npm run setup
```
هذا الأمر سينشئ:
- مستخدم super admin (admin@project24.com / admin123)
- ضمانات تجريبية (6 ضمانات)
- مميزات تجريبية (5 مميزات)

4. **تشغيل الخادم**
```bash
# للتطوير
npm run dev

# للإنتاج
npm start
```

## 🔌 API Endpoints

### المصادقة
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/logout` - تسجيل الخروج
- `POST /api/auth/refresh` - تجديد التوكن
- `GET /api/auth/profile` - الملف الشخصي

### الشقق
- `GET /api/apartments` - جلب جميع الشقق
- `GET /api/apartments/:id` - جلب شقة محددة
- `POST /api/apartments` - إنشاء شقة جديدة
- `PUT /api/apartments/:id` - تعديل شقة
- `DELETE /api/apartments/:id` - حذف شقة

### الوسائط
- `GET /api/media` - جلب جميع الوسائط
- `GET /api/media/:id` - جلب وسائط محددة
- `POST /api/media/upload` - رفع ملف واحد
- `POST /api/media/upload-multiple` - رفع ملفات متعددة
- `PUT /api/media/:id` - تعديل وسائط
- `DELETE /api/media/:id` - حذف وسائط

### المميزات
- `GET /api/project/features` - جلب جميع المميزات
- `GET /api/project/features/:id` - جلب ميزة محددة
- `POST /api/project/features` - إنشاء ميزة جديدة
- `PUT /api/project/features/:id` - تعديل ميزة
- `DELETE /api/project/features/:id` - حذف ميزة

### الضمانات
- `GET /api/project/warranties` - جلب جميع الضمانات
- `GET /api/project/warranties/:id` - جلب ضمان محدد
- `POST /api/project/warranties` - إنشاء ضمان جديد
- `PUT /api/project/warranties/:id` - تعديل ضمان
- `DELETE /api/project/warranties/:id` - حذف ضمان

### معلومات المشروع
- `GET /api/project/info` - جلب معلومات المشروع
- `PUT /api/project/info` - تعديل معلومات المشروع
- `GET /api/project/stats` - إحصائيات المشروع

## 🔐 الصلاحيات

### الأدوار
- `super_admin` - مدير النظام (جميع الصلاحيات)
- `admin` - مدير (جميع الصلاحيات عدا إدارة المديرين)
- `editor` - محرر (صلاحيات محدودة)

### الصلاحيات المتاحة
- `manage_apartments` - إدارة الشقق
- `manage_media` - إدارة الوسائط
- `manage_features` - إدارة المميزات
- `manage_warranties` - إدارة الضمانات
- `manage_project_info` - إدارة معلومات المشروع
- `manage_admins` - إدارة المديرين
- `view_analytics` - عرض التحليلات
- `manage_inquiries` - إدارة الاستفسارات

## 🛠️ التطوير

### هيكل المجلدات
```
backend/
├── config/          # إعدادات قاعدة البيانات والخدمات
├── controllers/     # منطق العمليات
├── middleware/      # وسطاء العمليات
├── models/          # نماذج قاعدة البيانات
├── routes/          # مسارات API
├── scripts/         # سكريبتس الإعداد
├── uploads/         # ملفات مرفوعة (تطوير)
└── server.js        # ملف الخادم الرئيسي
```

### الأوامر المتاحة
```bash
npm run dev      # تشغيل الخادم للتطوير
npm start        # تشغيل الخادم للإنتاج
npm run setup    # إعداد قاعدة البيانات
npm run seed     # إدراج بيانات تجريبية
```

## 🔍 اختبار API

يمكنك اختبار API باستخدام:
- Postman
- Thunder Client (VS Code)
- Insomnia

### مثال على طلب تسجيل الدخول
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@project24.com",
    "password": "admin123"
  }'
```

## 📝 ملاحظات

1. **الأمان**: تأكد من تغيير JWT_SECRET في الإنتاج
2. **قاعدة البيانات**: استخدم MongoDB Atlas للإنتاج
3. **رفع الملفات**: استخدم Cloudinary للإنتاج
4. **المراقبة**: أضف أدوات مراقبة للإنتاج

## 🐛 المشاكل الشائعة

### خطأ الاتصال بقاعدة البيانات
تأكد من تشغيل MongoDB وصحة MONGODB_URI

### خطأ CORS
تأكد من إعداد CORS بشكل صحيح للفرونت إند

### خطأ رفع الملفات
تحقق من صلاحيات مجلد uploads وحجم الملفات
