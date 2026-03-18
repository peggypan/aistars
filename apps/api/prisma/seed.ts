import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  // 演员类型
  { name: '武打明星', type: 'actor', icon: '💪', description: '擅长动作戏、武打场面', sortOrder: 1 },
  { name: '喜剧演员', type: 'actor', icon: '😄', description: '擅长喜剧表演、搞笑角色', sortOrder: 2 },
  { name: '实力派', type: 'actor', icon: '🎭', description: '演技精湛、戏路宽广', sortOrder: 3 },
  { name: '偶像派', type: 'actor', icon: '✨', description: '颜值出众、人气偶像', sortOrder: 4 },
  { name: '老戏骨', type: 'actor', icon: '👑', description: '经验丰富、德艺双馨', sortOrder: 5 },
  
  // 歌手类型
  { name: '流行歌手', type: 'singer', icon: '🎤', description: '流行音乐演唱', sortOrder: 6 },
  { name: '摇滚歌手', type: 'singer', icon: '🎸', description: '摇滚乐演唱', sortOrder: 7 },
  { name: 'R&B歌手', type: 'singer', icon: '🎵', description: 'R&B风格演唱', sortOrder: 8 },
  { name: '独立音乐人', type: 'singer', icon: '🎹', description: '独立音乐创作', sortOrder: 9 },
  
  // 其他类型
  { name: '主持人', type: 'host', icon: '🎙️', description: '节目主持、活动主持', sortOrder: 10 },
  { name: '模特', type: 'model', icon: '👠', description: '时装模特、平面模特', sortOrder: 11 },
  { name: '网络红人', type: 'other', icon: '📱', description: '社交媒体红人、网红', sortOrder: 12 },
];

async function main() {
  console.log('🌱 开始初始化分类数据...');
  
  for (const category of categories) {
    const existing = await prisma.category.findFirst({
      where: { name: category.name },
    });
    
    if (!existing) {
      await prisma.category.create({ data: category });
      console.log(`✅ 创建分类: ${category.name}`);
    } else {
      console.log(`⏭️ 分类已存在: ${category.name}`);
    }
  }
  
  console.log('🎉 分类数据初始化完成！');
}

main()
  .catch((e) => {
    console.error('❌ 初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
