# دليل رفع Backend على Vercel

## 📋 المتطلبات

1. **حساب Vercel** - سجل في [vercel.com](https://vercel.com)
2. **MongoDB Atlas** - قاعدة بيانات MongoDB في السحابة
3. **متغيرات البيئة** - إعداد المتغيرات المطلوبة

## 🚀 خطوات الرفع

### 1. إعداد قاعدة البيانات

1. أنشئ حساب في [MongoDB Atlas](https://www.mongodb.com/atlas)
2. أنشئ cluster جديد
3. احصل على connection string
4. استبدل `<username>` و `<password>` و `<database_name>` بالقيم الصحيحة

### 2. إعداد متغيرات البيئة في Vercel

في لوحة تحكم Vercel، اذهب إلى **Settings > Environment Variables** وأضف:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary (اختياري)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Google Maps (اختياري)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Environment
NODE_ENV=production
```

### 3. رفع المشروع

#### الطريقة الأولى: عبر GitHub
1. ارفع الكود إلى GitHub repository
2. في Vercel، اضغط **New Project**
3. اختر GitHub repository
4. Vercel سيكتشف تلقائياً أنه Node.js project
5. اضغط **Deploy**

#### الطريقة الثانية: عبر Vercel CLI
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# رفع المشروع
vercel

# رفع مع production
vercel --prod
```

### 4. إعدادات إضافية

#### في ملف `vercel.json`:
- تم تكوين الـ routes للـ API
- تم تعيين timeout إلى 30 ثانية
- تم إعداد environment variables

#### في ملف `package.json`:
- تم إضافة `engines` لتحديد إصدار Node.js
- تم إضافة scripts للـ Vercel

## 🔧 استكشاف الأخطاء

### خطأ 500 Internal Server Error

**الأسباب المحتملة:**
1. **متغيرات البيئة مفقودة** - تأكد من إضافة جميع المتغيرات المطلوبة
2. **MongoDB connection فاشل** - تحقق من connection string
3. **JWT_SECRET مفقود** - أضف JWT secret قوي
4. **Dependencies مفقودة** - تأكد من وجود جميع الـ packages

**الحلول:**
```bash
# تحقق من logs في Vercel
vercel logs

# أو في لوحة التحكم
# Functions > View Function Logs
```

### خطأ في الاتصال بقاعدة البيانات

```javascript
// تحقق من connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

// تأكد من:
// 1. username و password صحيحين
// 2. database_name موجود
// 3. IP address مسموح في MongoDB Atlas
```

### خطأ في CORS

```javascript
// في vercel.json، تأكد من:
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        }
      ]
    }
  ]
}
```

## 📊 اختبار الرفع

### 1. اختبار Health Check
```bash
curl https://your-app.vercel.app/health
```

### 2. اختبار API
```bash
curl https://your-app.vercel.app/api/project-info/homepage
```

### 3. اختبار Authentication
```bash
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@project24.com","password":"admin123456"}'
```

## 🔐 الأمان

### 1. JWT Secret
```bash
# استخدم secret قوي
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
```

### 2. MongoDB Security
- استخدم strong password
- قصر IP access على Vercel IPs
- استخدم SSL/TLS

### 3. Environment Variables
- لا تشارك `.env` files
- استخدم Vercel environment variables
- راجع المتغيرات بانتظام

## 📈 مراقبة الأداء

### 1. Vercel Analytics
- تفعيل في Settings > Analytics
- مراقبة response times
- تتبع errors

### 2. MongoDB Atlas Monitoring
- مراقبة connection count
- تتبع query performance
- مراقبة storage usage

## 🚀 نصائح للأداء

### 1. Database Connection
```javascript
// استخدم connection pooling
mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

### 2. Caching
```javascript
// استخدم Redis للـ caching (اختياري)
// أو استخدم Vercel Edge Functions
```

### 3. Image Optimization
```javascript
// استخدم Cloudinary للـ images
// أو Vercel Image Optimization
```

## 📞 الدعم

إذا واجهت مشاكل:

1. **تحقق من Vercel Logs**
2. **راجع MongoDB Atlas Logs**
3. **تأكد من Environment Variables**
4. **اختبر API endpoints محلياً أولاً**

## 🎯 الخطوات التالية

بعد الرفع الناجح:

1. **إعداد Domain مخصص** (اختياري)
2. **تفعيل SSL Certificate**
3. **إعداد Monitoring & Alerts**
4. **إعداد Backup Strategy**
5. **تحسين Performance**

---

**ملاحظة:** هذا المشروع مصمم للعمل على Vercel serverless functions. تأكد من أن جميع الـ dependencies متوافقة مع serverless environment.
