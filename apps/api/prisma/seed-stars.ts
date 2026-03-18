import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockStars = [
  {
    name: '林雨桐',
    age: 24,
    gender: 'female',
    nationality: '中国',
    personality: JSON.stringify(['温柔', '坚韧', '细心']),
    background: '出生于江南书香门第，从小学习古典舞，18岁考入北京电影学院表演系。',
    skills: JSON.stringify(['古典舞', '古筝', '茶艺', '书法']),
    appearance: '古典美人，眉眼如画，气质温婉，身高168cm',
    style: '古风优雅',
    signature: '用心演绎每一个角色',
    aiGenerated: true,
    aiPrompt: '24岁古典美女演员，江南气质，擅长古典舞',
  },
  {
    name: '张浩然',
    age: 28,
    gender: 'male',
    nationality: '中国',
    personality: JSON.stringify(['阳光', '幽默', '敬业']),
    background: '体育院校毕业，曾是省级游泳运动员，后转行做演员。',
    skills: JSON.stringify(['游泳', '武术', '驾驶', '英语']),
    appearance: '阳光型男，身材健硕，笑容温暖，身高185cm',
    style: '运动时尚',
    signature: '用汗水浇灌梦想',
    aiGenerated: true,
    aiPrompt: '28岁阳光运动型男演员，有运动员背景',
  },
  {
    name: '陈思琪',
    age: 22,
    gender: 'female',
    nationality: '中国',
    personality: JSON.stringify(['活泼', '开朗', '好奇心强']),
    background: '童星出道，10岁开始拍戏，拥有丰富的表演经验。',
    skills: JSON.stringify(['表演', '唱歌', '钢琴', '绘画']),
    appearance: '甜美可爱，灵气十足，身高163cm',
    style: '青春甜美',
    signature: '永远保持热爱',
    aiGenerated: true,
    aiPrompt: '22岁甜美可爱型女演员，童星出道',
  },
  {
    name: '王俊杰',
    age: 35,
    gender: 'male',
    nationality: '中国',
    personality: JSON.stringify(['沉稳', '睿智', '有担当']),
    background: '戏剧学院硕士毕业，深耕话剧舞台10年后转战影视圈。',
    skills: JSON.stringify(['话剧', '配音', '导演', '编剧']),
    appearance: '成熟稳重，五官深邃，气质儒雅，身高180cm',
    style: '成熟商务',
    signature: '表演是一门终生学问',
    aiGenerated: true,
    aiPrompt: '35岁成熟稳重型男演员，话剧出身',
  },
  {
    name: '李梦涵',
    age: 26,
    gender: 'female',
    nationality: '中国',
    personality: JSON.stringify(['独立', '自信', '有主见']),
    background: '海外留学归来，精通多国语言，擅长诠释现代都市女性角色。',
    skills: JSON.stringify(['英语', '法语', '爵士舞', '瑜伽']),
    appearance: '时尚干练，气场强大，身高170cm',
    style: '都市时尚',
    signature: '做自己的女王',
    aiGenerated: true,
    aiPrompt: '26岁海归时尚女演员，独立自信',
  },
  {
    name: '赵子轩',
    age: 30,
    gender: 'male',
    nationality: '中国',
    personality: JSON.stringify(['内敛', '专注', '追求完美']),
    background: '音乐学院毕业，原本是歌手，后转型演员，对角色有独特理解。',
    skills: JSON.stringify(['唱歌', '吉他', '作曲', '表演']),
    appearance: '文艺气质，眼神深邃，身高178cm',
    style: '文艺复古',
    signature: '用音乐诠释人生',
    aiGenerated: true,
    aiPrompt: '30岁文艺气质男演员，歌手转型',
  },
];

async function main() {
  console.log('🎭 开始创建示例演员数据...');
  
  // 获取分类
  const categories = await prisma.category.findMany();
  
  if (categories.length === 0) {
    console.log('⚠️ 请先运行 npm run seed 初始化分类数据');
    return;
  }
  
  // 获取男女演员分类
  const actorCategories = categories.filter(c => c.type === 'actor');
  const singerCategories = categories.filter(c => c.type === 'singer');
  
  for (let i = 0; i < mockStars.length; i++) {
    const starData = mockStars[i];
    
    // 随机分配1-2个分类
    const randomCategories = actorCategories
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 2) + 1);
    
    const categoryIds = randomCategories.map(c => c.id);
    
    const existing = await prisma.star.findFirst({
      where: { name: starData.name },
    });
    
    if (!existing) {
      await prisma.star.create({
        data: {
          ...starData,
          categories: JSON.stringify(categoryIds),
        },
      });
      console.log(`✅ 创建演员: ${starData.name}`);
    } else {
      console.log(`⏭️ 演员已存在: ${starData.name}`);
    }
  }
  
  console.log('🎉 示例演员数据创建完成！');
  console.log(`📊 当前共有 ${await prisma.star.count()} 位演员`);
}

main()
  .catch((e) => {
    console.error('❌ 创建失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
