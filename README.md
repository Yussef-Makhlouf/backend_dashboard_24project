# 🏢 مشروع 24 - حي الزهراء | Backend API

## 📋 الوصف
هذا هو الـ backend الخاص بلوحة تحكم مشروع 24 في حي الزهراء بجدة. يوفر API شامل لإدارة المشروع العقاري مع دعم كامل لـ Vercel serverless functions.

## ✨ المميزات
- 🏠 إدارة نماذج الشقق
- ⭐ إدارة المميزات والضمانات
- 📸 إدارة الوسائط والصور
- 🔐 نظام المصادقة والأذونات
- 📞 إدارة الاستفسارات
- 📊 إحصائيات المشروع
- ☁️ دعم Vercel serverless
- 🚀 تحسين الأداء

## 🛠️ التقنيات المستخدمة
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT
- **File Upload**: Cloudinary, Multer
- **Deployment**: Vercel
- **Security**: Helmet, CORS, Rate Limiting

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- MongoDB Atlas
- npm أو yarn

### خطوات التثبيت
```bash
# 1. استنساخ المشروع
git clone <repository-url>
cd backend

# 2. تثبيت المتطلبات
npm install

# 3. إعداد متغيرات البيئة
cp env.example .env
# قم بتعديل .env بالقيم الصحيحة

# 4. تشغيل المشروع محلياً
npm run dev

# 5. أو تشغيل في production
npm start
```

## 🔧 متغيرات البيئة

### المطلوبة
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

### الاختيارية
```env
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 🌐 API Endpoints

### المصادقة
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/logout` - تسجيل الخروج
- `POST /api/auth/refresh` - تجديد التوكن

### نماذج الشقق
- `GET /api/apartments` - جلب جميع النماذج
- `POST /api/apartments` - إنشاء نموذج جديد
- `PUT /api/apartments/:id` - تحديث نموذج
- `DELETE /api/apartments/:id` - حذف نموذج

### معلومات المشروع
- `GET /api/project-info/homepage` - بيانات الصفحة الرئيسية
- `GET /api/project-info/info` - معلومات المشروع
- `PUT /api/project-info/info/:id` - تحديث معلومات المشروع

### الوسائط
- `GET /api/media` - جلب الوسائط
- `POST /api/media/upload` - رفع ملف
- `DELETE /api/media/:id` - حذف ملف

### الاستفسارات
- `GET /api/inquiries` - جلب الاستفسارات
- `POST /api/inquiries` - إنشاء استفسار جديد
- `PUT /api/inquiries/:id` - تحديث استفسار

### المراقبة
- `GET /health` - فحص صحة الخادم
- `GET /status` - حالة النظام

## ☁️ رفع على Vercel

### الطريقة السريعة
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# رفع المشروع
vercel --prod
```

### إعداد متغيرات البيئة في Vercel
1. اذهب إلى **Settings > Environment Variables**
2. أضف جميع المتغيرات المطلوبة
3. تأكد من إضافة `MONGODB_URI` و `JWT_SECRET`

### اختبار الرفع
```bash
# اختبار Health Check
curl https://your-app.vercel.app/health

# اختبار API
curl https://your-app.vercel.app/api/project-info/homepage
```

## 📚 الوثائق

- [دليل الرفع على Vercel](VERCEL_DEPLOYMENT.md)
- [رفع سريع](QUICK_DEPLOY.md)
- [وثائق الـ Schemas](SCHEMAS_DOCUMENTATION.md)

## 🔍 استكشاف الأخطاء

### خطأ 500 Internal Server Error
1. تحقق من متغيرات البيئة
2. تأكد من MongoDB connection
3. راجع Vercel logs

### خطأ في CORS
- تم إعداد CORS في `vercel.json`
- تأكد من headers الصحيحة

### خطأ في Database
- تحقق من MongoDB Atlas connection string
- تأكد من IP whitelist

## 📊 مراقبة الأداء

### Vercel
```bash
vercel logs
```

### MongoDB Atlas
- مراقبة connection count
- تتبع query performance

## 🛡️ الأمان

- JWT authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation

## 📈 الأداء

- Serverless functions
- Connection pooling
- Compression
- Caching headers
- Optimized queries

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء feature branch
3. Commit التغييرات
4. Push إلى branch
5. إنشاء Pull Request

## 📄 الترخيص
MIT License

## 📞 الدعم

إذا واجهت مشاكل:
1. راجع الوثائق
2. تحقق من logs
3. اختبر محلياً أولاً
4. راجع Vercel documentation

---

**ملاحظة**: هذا المشروع محسن للعمل على Vercel serverless functions مع دعم كامل لجميع المميزات.