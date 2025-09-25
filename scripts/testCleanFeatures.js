// دالة لتنظيف المميزات من العلامات والأقواس
const cleanFeatures = (features) => {
  return features.map(feature => {
    // إزالة العلامات والأقواس المختلفة
    return feature
      .replace(/[\[\](){}]/g, '') // إزالة الأقواس
      .replace(/[\/\\]/g, '') // إزالة الشرطات
      .replace(/[|]/g, '') // إزالة الخطوط العمودية
      .replace(/[<>]/g, '') // إزالة علامات أكبر/أصغر
      .replace(/[!@#$%^&*+=]/g, '') // إزالة الرموز الخاصة
      .trim() // إزالة المسافات الزائدة
      .replace(/\s+/g, ' ') // استبدال المسافات المتعددة بمسافة واحدة
  }).filter(feature => feature.length > 0) // إزالة المميزات الفارغة
}

// اختبار الدالة
const testFeatures = [
  "غرفة خادمة",
  "[غرفة سائق]",
  "(شقق مودرن)",
  "{أسقف مرتفعة}",
  "نوافذ/كبيرة",
  "صالة\\مطبخ",
  "بلكونة|سمارت هوم",
  "موقف<خاص>",
  "مصعد!كاميرات مراقبة",
  "  مساحة واسعة  ",
  "",
  "///ميزة خاصة///"
]

console.log('🧪 اختبار دالة تنظيف المميزات:')
console.log('\n📋 المميزات الأصلية:')
testFeatures.forEach((feature, index) => {
  console.log(`  ${index + 1}. "${feature}"`)
})

console.log('\n✨ المميزات بعد التنظيف:')
const cleanedFeatures = cleanFeatures(testFeatures)
cleanedFeatures.forEach((feature, index) => {
  console.log(`  ${index + 1}. "${feature}"`)
})

console.log(`\n📊 النتائج:`)
console.log(`  - المميزات الأصلية: ${testFeatures.length}`)
console.log(`  - المميزات بعد التنظيف: ${cleanedFeatures.length}`)
console.log(`  - تم إزالة: ${testFeatures.length - cleanedFeatures.length} مميزة فارغة أو غير صالحة`)
