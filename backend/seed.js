const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Software = require('./models/Software');
const Admin = require('./models/Admin');

// Load env vars
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/* 
Image sources:
- Software thumbnails are generated using Picsum Photos (https://picsum.photos) as placeholders
- Category icons use Font Awesome icon names (can be replaced with actual icons in the frontend)
*/

// Sample data
const categories = [
  {
    name: 'Development Tools',
    description: 'IDEs, code editors, and development environments for programmers',
    icon: 'fa-code',
    slug: 'development-tools'
  },
  {
    name: 'Security & Privacy',
    description: 'Antivirus, firewall, and privacy protection software',
    icon: 'fa-shield-alt',
    slug: 'security-privacy'
  },
  {
    name: 'System Utilities',
    description: 'System optimization, cleanup, and maintenance tools',
    icon: 'fa-tools',
    slug: 'system-utilities'
  },
  {
    name: 'Multimedia',
    description: 'Audio, video, and image editing software',
    icon: 'fa-photo-video',
    slug: 'multimedia'
  },
  {
    name: 'Productivity',
    description: 'Office suites, note-taking, and task management applications',
    icon: 'fa-tasks',
    slug: 'productivity'
  },
  {
    name: 'Communication',
    description: 'Email clients, messaging, and video conferencing tools',
    icon: 'fa-comments',
    slug: 'communication'
  },
  {
    name: 'Education',
    description: 'Learning software, educational tools, and reference materials',
    icon: 'fa-graduation-cap',
    slug: 'education'
  },
  {
    name: 'Gaming',
    description: 'Game development tools, gaming utilities, and game mods',
    icon: 'fa-gamepad',
    slug: 'gaming'
  }
];

const software = [
  {
    name: 'Visual Studio Code',
    description: 'A lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js',
    version: '1.85.1',
    size: '100MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Free',
    rating: 4.8,
    downloads: 1500000,
    fileUrl: 'https://example.com/downloads/vscode-1.85.1.zip',
    thumbnail: 'https://picsum.photos/200/200?random=1',
    category: 'Development Tools',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10')
  },
  {
    name: 'Sublime Text 4',
    description: 'Fast, lightweight, and customizable text editor for code, markup, and prose',
    version: '4.0.1',
    size: '85MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Paid',
    rating: 4.7,
    downloads: 800000,
    fileUrl: 'https://example.com/downloads/sublime-text-4.zip',
    thumbnail: 'https://picsum.photos/200/200?random=2',
    category: 'Development Tools',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2024-01-05')
  },
  {
    name: 'Malwarebytes Premium',
    description: 'Advanced threat protection and removal tool for malware, ransomware, and viruses',
    version: '4.6.0',
    size: '280MB',
    os: ['Windows', 'macOS'],
    license: 'Trial',
    rating: 4.6,
    downloads: 950000,
    fileUrl: 'https://example.com/downloads/malwarebytes-4.6.0.exe',
    thumbnail: 'https://picsum.photos/200/200?random=3',
    category: 'Security & Privacy',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    name: 'CCleaner Professional',
    description: 'System optimization and cleaning tool that removes unused files and fixes registry issues',
    version: '6.2.0',
    size: '35MB',
    os: ['Windows'],
    license: 'Trial',
    rating: 4.4,
    downloads: 1200000,
    fileUrl: 'https://example.com/downloads/ccleaner-6.2.0.exe',
    thumbnail: 'https://picsum.photos/200/200?random=4',
    category: 'System Utilities',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2024-01-08')
  },
  {
    name: 'Adobe Premiere Pro',
    description: 'Professional video editing software for film, TV, and web content',
    version: '24.0',
    size: '2.5GB',
    os: ['Windows', 'macOS'],
    license: 'Paid',
    rating: 4.7,
    downloads: 500000,
    fileUrl: 'https://example.com/downloads/premiere-pro-24.zip',
    thumbnail: 'https://picsum.photos/200/200?random=5',
    category: 'Multimedia',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    name: 'Microsoft Office 365',
    description: 'Complete productivity suite including Word, Excel, PowerPoint, and more',
    version: '2024',
    size: '4GB',
    os: ['Windows', 'macOS'],
    license: 'Paid',
    rating: 4.8,
    downloads: 2000000,
    fileUrl: 'https://example.com/downloads/office365-2024.exe',
    thumbnail: 'https://picsum.photos/200/200?random=6',
    category: 'Productivity',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2024-01-12')
  },
  {
    name: 'Zoom Client',
    description: 'Video conferencing and online meeting software with screen sharing',
    version: '5.15.5',
    size: '180MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Free',
    rating: 4.5,
    downloads: 3000000,
    fileUrl: 'https://example.com/downloads/zoom-5.15.5.exe',
    thumbnail: 'https://picsum.photos/200/200?random=7',
    category: 'Communication',
    createdAt: new Date('2023-07-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    name: 'Rosetta Stone',
    description: 'Language learning software with speech recognition technology',
    version: '8.10.0',
    size: '1.8GB',
    os: ['Windows', 'macOS'],
    license: 'Paid',
    rating: 4.6,
    downloads: 300000,
    fileUrl: 'https://example.com/downloads/rosetta-stone-8.10.0.exe',
    thumbnail: 'https://picsum.photos/200/200?random=8',
    category: 'Education',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2024-01-15')
  },
  {
    name: 'Unity Hub',
    description: 'Management tool for Unity game development projects and installations',
    version: '3.5.0',
    size: '750MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Free',
    rating: 4.5,
    downloads: 400000,
    fileUrl: 'https://example.com/downloads/unity-hub-3.5.0.exe',
    thumbnail: 'https://picsum.photos/200/200?random=9',
    category: 'Gaming',
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2024-01-10')
  },
  {
    name: 'IntelliJ IDEA',
    description: 'Powerful IDE for Java development with advanced code assistance',
    version: '2023.3.2',
    size: '850MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Paid',
    rating: 4.8,
    downloads: 600000,
    fileUrl: 'https://example.com/downloads/intellij-2023.3.2.zip',
    thumbnail: 'https://picsum.photos/200/200?random=10',
    category: 'Development Tools',
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2024-01-05')
  },
  {
    name: 'ExpressVPN',
    description: 'High-speed, secure VPN service for online privacy and security',
    version: '12.12.0',
    size: '95MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Paid',
    rating: 4.7,
    downloads: 750000,
    fileUrl: 'https://example.com/downloads/expressvpn-12.12.0.exe',
    thumbnail: 'https://picsum.photos/200/200?random=11',
    category: 'Security & Privacy',
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    name: 'Advanced SystemCare',
    description: 'All-in-one PC optimization tool for better performance',
    version: '16.1.0',
    size: '120MB',
    os: ['Windows'],
    license: 'Trial',
    rating: 4.3,
    downloads: 850000,
    fileUrl: 'https://example.com/downloads/asc-16.1.0.exe',
    thumbnail: 'https://picsum.photos/200/200?random=12',
    category: 'System Utilities',
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2024-01-08')
  },
  {
    name: 'DaVinci Resolve',
    description: 'Professional video editing, color correction, and audio post-production',
    version: '18.5',
    size: '3.2GB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Free',
    rating: 4.8,
    downloads: 450000,
    fileUrl: 'https://example.com/downloads/davinci-resolve-18.5.zip',
    thumbnail: 'https://picsum.photos/200/200?random=13',
    category: 'Multimedia',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, documents, and collaboration',
    version: '2.0.40',
    size: '150MB',
    os: ['Windows', 'macOS'],
    license: 'Free',
    rating: 4.7,
    downloads: 900000,
    fileUrl: 'https://example.com/downloads/notion-2.0.40.exe',
    thumbnail: 'https://picsum.photos/200/200?random=14',
    category: 'Productivity',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    name: 'Discord',
    description: 'Voice, video, and text chat app designed for communities',
    version: '1.0.9025',
    size: '130MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Free',
    rating: 4.6,
    downloads: 2500000,
    fileUrl: 'https://example.com/downloads/discord-1.0.9025.exe',
    thumbnail: 'https://picsum.photos/200/200?random=15',
    category: 'Communication',
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2024-01-18')
  },
  {
    name: 'Duolingo',
    description: 'Interactive language learning app with gamified lessons',
    version: '5.2.0',
    size: '200MB',
    os: ['Windows', 'macOS'],
    license: 'Free',
    rating: 4.7,
    downloads: 1800000,
    fileUrl: 'https://example.com/downloads/duolingo-5.2.0.exe',
    thumbnail: 'https://picsum.photos/200/200?random=16',
    category: 'Education',
    createdAt: new Date('2023-11-25'),
    updatedAt: new Date('2024-01-12')
  },
  {
    name: 'OBS Studio',
    description: 'Free and open source software for video recording and live streaming',
    version: '30.0.2',
    size: '280MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Free',
    rating: 4.8,
    downloads: 1100000,
    fileUrl: 'https://example.com/downloads/obs-30.0.2.zip',
    thumbnail: 'https://picsum.photos/200/200?random=17',
    category: 'Gaming',
    createdAt: new Date('2023-10-30'),
    updatedAt: new Date('2024-01-16')
  },
  {
    name: 'PyCharm',
    description: 'Professional Python IDE with a complete set of tools',
    version: '2023.3.2',
    size: '720MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Paid',
    rating: 4.7,
    downloads: 550000,
    fileUrl: 'https://example.com/downloads/pycharm-2023.3.2.exe',
    thumbnail: 'https://picsum.photos/200/200?random=18',
    category: 'Development Tools',
    createdAt: new Date('2023-09-25'),
    updatedAt: new Date('2024-01-14')
  },
  {
    name: 'Bitdefender Total Security',
    description: 'Complete protection against all online threats and malware',
    version: '2024.1.0',
    size: '650MB',
    os: ['Windows', 'macOS'],
    license: 'Paid',
    rating: 4.8,
    downloads: 700000,
    fileUrl: 'https://example.com/downloads/bitdefender-2024.1.0.exe',
    thumbnail: 'https://picsum.photos/200/200?random=19',
    category: 'Security & Privacy',
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-01-19')
  },
  {
    name: 'Audacity',
    description: 'Free, open source, cross-platform audio software',
    version: '3.4.2',
    size: '45MB',
    os: ['Windows', 'macOS', 'Linux'],
    license: 'Free',
    rating: 4.5,
    downloads: 950000,
    fileUrl: 'https://example.com/downloads/audacity-3.4.2.zip',
    thumbnail: 'https://picsum.photos/200/200?random=20',
    category: 'Multimedia',
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-01-17')
  }
];

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Software.deleteMany();
    await Admin.deleteMany();

    // Create admin
    await Admin.create({
      username: 'admin',
      password: 'admin123'
    });

    // Create categories
    const createdCategories = await Category.create(categories);

    // Create a map of category names to IDs
    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    // Add category references to software
    const softwareWithCategories = software.map(item => ({
      ...item,
      category: categoryMap[item.category]
    }));

    // Create software
    await Software.create(softwareWithCategories);

    // Update category software counts
    for (const category of createdCategories) {
      const count = softwareWithCategories.filter(
        item => item.category.toString() === category._id.toString()
      ).length;
      await Category.findByIdAndUpdate(category._id, { softwareCount: count });
    }

    console.log('Data seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData(); 