# توثيق Schemas المشروع الجديدة

## نظرة عامة

تم إنشاء schemas جديدة للباك إند بناءً على تحليل شامل لصفحة المشروع الرئيسية. هذه الـ schemas تسمح بإدارة ديناميكية لجميع بيانات المشروع.

## الـ Schemas الجديدة

### 1. ProjectInfo Schema
**الملف**: `backend/models/ProjectInfo.js`

يحتوي على معلومات المشروع الأساسية:

```javascript
{
  projectName: String,           // اسم المشروع
  projectTitle: String,          // عنوان المشروع
  projectSubtitle: String,       // العنوان الفرعي
  projectDescription: String,    // وصف المشروع
  location: {
    district: String,            // الحي
    city: String,                // المدينة
    country: String,             // البلد
    coordinates: {
      latitude: Number,          // خط العرض
      longitude: Number          // خط الطول
    },
    nearbyLandmarks: Array      // المعالم القريبة
  },
  startingPrice: Number,        // السعر الابتدائي
  currency: String,             // العملة
  backgroundImage: String,       // صورة الخلفية
  projectImages: Array,         // صور المشروع
  projectVideo: {
    title: String,              // عنوان الفيديو
    youtubeId: String,          // معرف يوتيوب
    thumbnail: String           // صورة الفيديو
  },
  projectFeatures: Array,       // مميزات المشروع
  locationFeatures: {
    nearby: Array,              // قريب من
    minutesFrom: Array          // دقائق من
  },
  warranties: Array,            // الضمانات
  contactSettings: Object,      // إعدادات التواصل
  platformSettings: Object      // إعدادات المنصة
}
```

### 2. ApartmentModel Schema
**الملف**: `backend/models/ApartmentModel.js`

يحتوي على بيانات نماذج الشقق:

```javascript
{
  modelName: String,            // اسم النموذج (A, B, C, D)
  modelTitle: String,           // عنوان النموذج
  modelSubtitle: String,        // العنوان الفرعي
  price: Number,                // السعر
  currency: String,             // العملة
  area: Number,                 // المساحة
  roofArea: Number,             // مساحة السطح
  totalArea: Number,            // المساحة الإجمالية
  areaDetails: String,          // تفاصيل المساحة
  rooms: Number,                // عدد الغرف
  bathrooms: Number,            // عدد دورات المياه
  floor: Number,                // الطابق
  location: String,             // الموقع
  direction: String,            // الاتجاه
  description: String,          // الوصف
  images: Array,                // الصور
  mainImage: String,            // الصورة الرئيسية
  features: Array,              // المميزات
  status: String,               // الحالة
  displayOrder: Number,         // ترتيب العرض
  isVisible: Boolean           // مرئي
}
```

### 3. ProjectFeature Schema
**الملف**: `backend/models/ProjectFeature.js`

يحتوي على مميزات المشروع:

```javascript
{
  title: String,                // عنوان الميزة
  description: String,          // وصف الميزة
  icon: String,                // الأيقونة
  featureType: String,         // نوع الميزة (project, location, apartment, warranty)
  category: String,            // فئة الميزة
  displayOrder: Number,        // ترتيب العرض
  status: String,              // الحالة
  isVisible: Boolean           // مرئي
}
```

### 4. ProjectWarranty Schema
**الملف**: `backend/models/ProjectWarranty.js`

يحتوي على بيانات الضمانات:

```javascript
{
  title: String,                // عنوان الضمان
  description: String,          // وصف الضمان
  years: Number,                // عدد السنوات
  warrantyType: String,          // نوع الضمان
  category: String,            // فئة الضمان
  displayOrder: Number,        // ترتيب العرض
  status: String,              // الحالة
  isVisible: Boolean           // مرئي
}
```

### 5. ProjectMedia Schema
**الملف**: `backend/models/ProjectMedia.js`

يحتوي على بيانات الوسائط:

```javascript
{
  fileName: String,             // اسم الملف
  originalName: String,         // الاسم الأصلي
  filePath: String,            // مسار الملف
  fileUrl: String,             // رابط الملف
  fileType: String,            // نوع الملف (image, video, document, audio)
  category: String,            // فئة الملف
  fileSize: Number,            // حجم الملف
  dimensions: {                // الأبعاد (للصور)
    width: Number,
    height: Number
  },
  title: String,               // العنوان
  description: String,         // الوصف
  altText: String,             // النص البديل
  displayOrder: Number,        // ترتيب العرض
  status: String,              // الحالة
  isVisible: Boolean,          // مرئي
  uploadedBy: ObjectId         // رفع بواسطة
}
```

### 6. ContactSettings Schema
**الملف**: `backend/models/ContactSettings.js`

يحتوي على إعدادات التواصل:

```javascript
{
  projectName: String,         // اسم المشروع
  phoneNumbers: {
    meta: String,              // رقم Meta
    snapchat: String,          // رقم Snapchat
    tiktok: String,           // رقم TikTok
    google: String,            // رقم Google
    default: String            // الرقم الافتراضي
  },
  welcomeMessages: {
    snapchat: String,          // رسالة Snapchat
    tiktok: String,           // رسالة TikTok
    meta: String,              // رسالة Meta
    google: String,            // رسالة Google
    facebook: String           // رسالة Facebook
  },
  emailSettings: {
    host: String,              // خادم البريد
    port: Number,              // المنفذ
    secure: Boolean,           // آمن
    user: String,              // المستخدم
    password: String           // كلمة المرور
  },
  trackingSettings: Object,     // إعدادات التتبع
  formSettings: Object,        // إعدادات النماذج
  sharingSettings: Object      // إعدادات المشاركة
}
```

## Controllers الجديدة

### ProjectInfoController
**الملف**: `backend/controllers/projectInfoController.js`

#### الوظائف المتاحة:

1. **getProjectInfo()** - الحصول على معلومات المشروع
2. **updateProjectInfo()** - تحديث معلومات المشروع
3. **getHomePageData()** - الحصول على جميع البيانات للصفحة الرئيسية
4. **getApartmentModel()** - الحصول على بيانات نموذج معين
5. **getContactSettings()** - الحصول على إعدادات التواصل
6. **updateContactSettings()** - تحديث إعدادات التواصل
7. **getPhoneNumberByPlatform()** - الحصول على رقم الهاتف حسب المنصة
8. **getWelcomeMessageByPlatform()** - الحصول على رسالة الترحيب حسب المنصة

## Routes الجديدة

### ProjectInfo Routes
**الملف**: `backend/routes/projectInfo.js`

#### المسارات المتاحة:

- `GET /api/project-info/info` - الحصول على معلومات المشروع
- `PUT /api/project-info/info/:id` - تحديث معلومات المشروع
- `GET /api/project-info/homepage` - الحصول على بيانات الصفحة الرئيسية
- `GET /api/project-info/apartment-model/:modelName` - الحصول على نموذج معين
- `GET /api/project-info/contact-settings` - الحصول على إعدادات التواصل
- `PUT /api/project-info/contact-settings/:id` - تحديث إعدادات التواصل
- `GET /api/project-info/phone/:platform` - الحصول على رقم الهاتف حسب المنصة
- `GET /api/project-info/welcome-message/:platform` - الحصول على رسالة الترحيب حسب المنصة

## Scripts الجديدة

### Seed Project Data
**الملف**: `backend/scripts/seedProjectData.js`

يحتوي على جميع البيانات المستخرجة من الصفحة الرئيسية:

- معلومات المشروع الأساسية
- بيانات نماذج الشقق (A, B, C, D)
- مميزات المشروع والموقع
- الضمانات
- الوسائط
- إعدادات التواصل

#### كيفية الاستخدام:

```bash
# تشغيل السكريبت لملء البيانات
node backend/scripts/seedProjectData.js
```

## البيانات المستخرجة من الصفحة

### معلومات المشروع:
- **الاسم**: مشروع سكني متميز في حي الزهراء بجدة
- **الموقع**: حي الزهراء، جدة، المملكة العربية السعودية
- **الإحداثيات**: 21.60813558568744, 39.14033718505742
- **السعر الابتدائي**: 830,000 ريال
- **الصور**: 5 صور للمشروع
- **الفيديو**: رابط يوتيوب

### نماذج الشقق:
1. **النموذج A**: 830,000 ريال، 156 م²، 4 غرف، 4 دورات مياه
2. **النموذج B**: 930,000 ريال، 190 م²، 5 غرف، 4 دورات مياه
3. **النموذج C**: 830,000 ريال، 156 م²، 4 غرف، 4 دورات مياه
4. **النموذج D**: 1,350,000 ريال، 220 م²، 5 غرف، 5 دورات مياه

### المميزات:
- موقع إستراتيجي قريب من الواجهة البحرية
- قريب من جميع الخدمات
- ضمانات تصل إلى 25 سنة
- مساحات تصل إلى 220م²
- مواقف سيارات مخصصة
- سمارت هوم

### الضمانات:
- 20 سنة: القواطع والأفياش
- 20 سنة: الهيكل الإنشائي
- 5 سنوات: المصاعد
- 2 سنة: أعمال السباكة والكهرباء
- 2 سنة: سمارت هوم
- 1 سنة: اتحاد ملاك

### أرقام التواصل:
- Meta: 0555812257
- Snapchat: 0543766262
- TikTok: 0539488805
- Google: 0552845403
- Default: 0536667967

## المميزات الجديدة

1. **إدارة ديناميكية**: جميع البيانات قابلة للتعديل من خلال API
2. **تتبع المنصات**: أرقام هواتف ورسائل مختلفة حسب المنصة
3. **إدارة الوسائط**: نظام شامل لإدارة الصور والفيديوهات
4. **ضمانات مفصلة**: إدارة دقيقة للضمانات المختلفة
5. **مميزات قابلة للتخصيص**: إضافة وتعديل المميزات بسهولة
6. **ترتيب العرض**: إمكانية ترتيب العناصر حسب الحاجة
7. **حالات العناصر**: إمكانية تفعيل/إلغاء تفعيل العناصر

## الاستخدام

### 1. تشغيل السكريبت لملء البيانات:
```bash
node backend/scripts/seedProjectData.js
```

### 2. استخدام API:
```javascript
// الحصول على بيانات الصفحة الرئيسية
fetch('/api/project-info/homepage')
  .then(response => response.json())
  .then(data => console.log(data));

// الحصول على رقم الهاتف حسب المنصة
fetch('/api/project-info/phone/facebook')
  .then(response => response.json())
  .then(data => console.log(data.phoneNumber));
```

### 3. تحديث البيانات:
```javascript
// تحديث معلومات المشروع
fetch('/api/project-info/info/:id', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    projectName: 'اسم جديد للمشروع'
  })
});
```

## الخلاصة

تم إنشاء نظام شامل لإدارة بيانات المشروع يتضمن:

- ✅ 6 schemas جديدة
- ✅ Controller متكامل
- ✅ Routes منظمة
- ✅ Script لملء البيانات
- ✅ توثيق شامل
- ✅ جميع البيانات المستخرجة من الصفحة
- ✅ إدارة ديناميكية للبيانات
- ✅ تتبع المنصات المختلفة
- ✅ نظام ضمانات متقدم
- ✅ إدارة وسائط شاملة

هذا النظام يسمح بإدارة كاملة وديناميكية لجميع بيانات المشروع من خلال API موحد ومنظم.
