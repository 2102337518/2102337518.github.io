/* =====================================================================
 * content.js — 网站全部内容（中英双语）
 * ---------------------------------------------------------------------
 * 只需要编辑这个文件，就能更新网站上的所有文字、链接和图片。
 * 每个文本字段都是 { zh: "中文内容", en: "English content" } 的格式；
 * 没有双语需求的字段（如日期、论文标题）直接用普通字符串即可。
 * ===================================================================== */

window.SITE_DATA = {

  profile: {
    /* 姓名：两种语言的写法 */
    name: { zh: "林镇标", en: "Zhenbiao Lin" },

    /* 职位 / 身份 */
    role: {
      zh: "机器人算法工程师",
      en: "Robotics Algorithm Engineer"
    },

    /* 单位 / 学校（英文名如非官方译名请自行修正） */
    affiliation: {
      zh: "招商局狮子山人工智能实验室",
      en: "Lion Rock AI Lab, China Merchants Group"
    },

    /* 头像：1:1 正方形照片，当前为简历中提取的照片，可换更高清的 */
    avatar: "assets/img/avatar.png",

    /* 自我介绍（100~200 字） */
    bio: {
      zh: "我是林镇标，机器人算法工程师，目前就职于招商局狮子山人工智能实验室。硕士毕业于电子科技大学电子信息专业，本科毕业于广东工业大学自动化专业。我专注于机器人运动控制与强化学习：熟悉 PPO 等强化学习算法、Transformer/GRU 等网络结构，以及 PID、LQR、MPC、WBC 等控制方法，在四足机器人、轮足机器人、人形机器人上完成多项实机部署。曾在小鹏汽车、大疆创新、美的中央研究院实习。",
      en: "I am Zhenbiao Lin, a robotics algorithm engineer at Lion Rock AI Lab, China Merchants Group. I received my M.S. in Electronic Information from UESTC and my B.S. in Automation from Guangdong University of Technology. My work focuses on robot locomotion control and reinforcement learning: PPO and other RL algorithms, Transformer/GRU architectures, and classical control methods such as PID, LQR, MPC, and WBC, with real-robot deployments on quadruped, wheel-legged, and humanoid platforms. I previously interned at XPeng Robotics, DJI, and Midea Corporate Research Center."
    },

    /* 简历 PDF（由 cv-generator 工具生成） */
    cv: "assets/cv/林镇标-个人简历.pdf",
    cv_en: "assets/cv/林镇标-个人简历-EN.pdf",

    /* 社交链接：icon 可选值 github / email / scholar / linkedin / x / bilibili / zhihu / youtube / homepage
       不需要的整行删掉即可 */
    links: [
      { icon: "github", label: "GitHub", url: "https://github.com/2102337518" },
      { icon: "email",  label: "Email",  url: "mailto:2102337518@qq.com" }
    ]
  },

  /* 新闻动态：留空数组 [] 时整个板块自动隐藏。
     想启用时按下面的格式添加条目（最新的排在最上面）：
     { date: "2025-07", zh: "中文内容", en: "English content" } */
  news: [],

  /* ================= 项目（网站的核心板块） =================
   * 每个项目字段：
   *   title      项目名（双语）
   *   desc       一两句话介绍（双语）
   *   img        项目卡片图（16:9 截图/实拍）
   *   diagram    算法框图（可选，放在介绍下方，可点击放大）
   *   video      演示视频 mp4（可选，放在介绍下方，点击播放）
   *   tags       技术标签数组
   *   links      链接数组（github / code / file / external / homepage），
   *              url 留空 "" 该按钮不显示；暂无链接可整组省略
   */
  projects: [
    {
      title: { zh: "基于注意力机制的感知运控四足机器人", en: "Attention-based Perceptive Locomotion for Quadruped Robots" },
      img: "assets/img/projects/project1.jpg",
      diagram: "assets/img/projects/diagram-heightmap.png",
      video: "assets/videos/quadruped.mp4",
      tags: ["Reinforcement Learning", "Attention", "GRU", "Unitree GO2"],
      desc: {
        zh: "在 Actor 网络中引入多头注意力机制，将 CNN 提取的深度视觉特征（Key/Value）与本体感知特征（Query）深度融合，串联 GRU 处理动态时序；定向设计落足点奖励与 AMP 行走步态，实现 GO2 稳定穿越梅花桩的全地形行走实机部署。",
        en: "Introduced multi-head attention into the Actor network to fuse CNN depth-visual features (Key/Value) with proprioception (Query), plus a GRU for temporal dynamics. Designed foothold rewards and AMP gaits, achieving stable plum-blossom-pile traversal with real-robot deployment on Unitree GO2."
      }
    },
    {
      title: { zh: "自研轮足机器人全地形越障（量产落地）", en: "In-house Wheel-legged Robot: All-terrain Obstacle Crossing" },
      img: "assets/img/projects/project2.jpg",
      diagram: "assets/img/projects/diagram-actorcritic.png",
      video: "assets/videos/wheelleg.mp4",
      tags: ["Isaac Lab", "DreamWaQ", "VAE", "Locomotion"],
      desc: {
        zh: "将 DreamWaQ 算法移植至 Isaac Lab 仿真环境并加入 VAE 负载估计模块，完成达到机器人自身体重的负载实机测试；从 0 到 1 完成自研轮足机器人算法实现与落地，训练自研 Policy，实现爬楼梯、高台等多模态运动策略的稳定输出。",
        en: "Ported DreamWaQ to Isaac Lab with a VAE payload-estimation module, passing full-body-weight payload tests on hardware. Delivered the wheel-legged robot's algorithm stack from scratch, training policies for stable multi-modal locomotion including stair climbing and platform ascent."
      }
    },
    {
      title: { zh: "自研人形机器人走跑一体运控", en: "In-house Humanoid Walk-Run Locomotion Control" },
      img: "assets/img/projects/humanoid.jpg",
      diagram: "assets/img/projects/diagram-humanoid.svg",
      video: "assets/videos/humanoid.mp4",
      tags: ["Humanoid", "23-DOF", "PPO", "Isaac Lab", "Locomotion"],
      desc: {
        zh: "在 Isaac Lab/Gym 中基于 PPO 分别训练 23DOF 人形机器人的行走与跑步策略，实现走跑一体的连续切换与全向运动；训练中引入腰部运动幅度惩罚并调整原地旋转奖励，完成真机部署验证。",
        en: "Trained 23-DOF humanoid walking and running policies with PPO in Isaac Lab/Gym, enabling smooth walk-run transitions and omnidirectional locomotion; introduced waist-motion-amplitude penalties and tuned in-place rotation rewards, with real-robot deployment."
      }
    },
    {
      title: { zh: "Sonic / MimicLite 全身运动跟踪", en: "Sonic / MimicLite Whole-Body Motion Tracking" },
      img: "assets/img/projects/sonic.jpg",
      diagram: "assets/img/projects/diagram-sonic.svg",
      video: "assets/videos/sonic.mp4",
      tags: ["Humanoid", "Motion Tracking", "Teleoperation", "Sim-to-Real"],
      desc: {
        zh: "基于 Sonic 与 MimicLite 实现人形机器人全身运动跟踪：跑通 Sonic 真机部署链路；完成 lafan 数据重映射与 holomotion 适配并修复跳变；MimicLite 采用 TN 曲线硬约束与 reward 软约束两种方案训练。",
        en: "Whole-body humanoid motion tracking via Sonic and MimicLite: established the Sonic real-robot deployment pipeline; completed lafan data remapping and holomotion adaptation, fixing remapping jitter; trained MimicLite with both TN-curve hard constraints and reward soft constraints."
      }
    },
  ],

  /* ================= 实习经历（与项目区分，单独展示） ================= */
  internships: [
    {
      title: { zh: "人形机器人遥操作与步态优化", en: "Humanoid Robot Teleoperation & Gait Optimization" },
      org: { zh: "小鹏汽车 · 机器人中心", en: "XPeng Robotics" },
      img: "assets/img/projects/humanoid-xpeng.jpg",
      video: "assets/videos/xpeng.mp4",
      tags: ["Humanoid", "MuJoCo", "Teleoperation", "Gait Planning"],
      desc: {
        zh: "独立负责 VR 遥操作控制 PX5 人形机器人行走：通讯系统方案设计、MuJoCo 仿真验证、系统状态机与实机调试；基于贝塞尔曲线完成步态规划与 smart gait 模式切换，实现直膝行走实机调优，并完成电机执行器性能摸底与 PVT 控制器参数整定。技术栈：WBC、IQP、LQR、MPC、C/C++，实习绩效考评优秀。",
        en: "Independently led VR teleoperation of the PX5 humanoid: communication architecture, MuJoCo simulation, state machine, and hardware tuning. Planned gaits with Bézier curves, implemented smart-gait switching and straight-knee walking, and performed motor-actuator characterization with PVT controller tuning. Stack: WBC, IQP, LQR, MPC, C/C++; rated \"excellent\" in the internship performance review."
      }
    },
    {
      title: { zh: "车载自动驾驶正向开发（A-SPICE）", en: "Automotive Forward Development (A-SPICE)" },
      org: { zh: "大疆创新 · 车载自动驾驶", en: "DJI Automotive" },
      img: "assets/img/projects/dji.jpg",
      diagram: "assets/img/projects/diagram-aspice.png",
      video: "assets/videos/dji.mp4",
      tags: ["AUTOSAR", "A-SPICE", "CAN", "Embedded"],
      desc: {
        zh: "基于 A-SPICE 的正向开发：代码静态检查与 Coverity 扫描修复、Cantata 单元测试、gdb 集成调试；AUTOSAR 嵌入式开发与 CAN 通讯验证；车辆执行器性能摸底与开环验收。",
        en: "A-SPICE forward development including static code checks, Coverity remediation, Cantata unit tests, and gdb integration debugging; AUTOSAR embedded development and CAN communication validation; vehicle actuator characterization and open-loop acceptance."
      }
    }
  ],

  /* ================= 竞赛（与项目区分，单独展示） ================= */
  competitions: [
    {
      year: "2020",
      title: { zh: "全国大学生机器人大赛 ROBOCON", en: "ROBOCON National College Robot Competition" },
      img: "assets/img/projects/robocon.jpg",
      video: "assets/videos/robocon.mp4",
      tags: ["Embedded", "STM32", "PID", "Webots"],
      desc: {
        zh: "担任电控组组长，带领团队完成两台轮式移动机器人自主抛踢橄榄球：STM32F4 主控开发与多传感器融合、正交码盘+陀螺仪全场定位、基于 Webots 的四阶贝塞尔曲线轨迹优化，获全国一等奖（全国季军），并代表中国参加亚太 ABU Robocon 国际交流赛。",
        en: "As electronics team lead, built two wheeled robots for autonomous rugby throwing and kicking: STM32F4 control with multi-sensor fusion, encoder+gyro full-field localization, and 4th-order Bézier trajectory optimization in Webots. Won national First Prize (3rd place) and represented China at the Asia-Pacific ABU Robocon."
      }
    },
    {
      year: "2023",
      title: { zh: "大疆 RoboMaster 智在飞翔无人机竞赛", en: "DJI RoboMaster ZhiZai FeiXiang Drone Competition" },
      img: "assets/img/projects/drone.jpg",
      video: "assets/videos/robomaster.mp4",
      tags: ["UAV", "VINS-Fusion", "Ego-Planner", "MPC"],
      desc: {
        zh: "完成 Jetson ORIN NX 下定位算法 VINS-Fusion、规划算法 Ego-Planner 部署；完成无人机姿态估计器、姿态控制器（串级 PID）参数整定；LQR 控制器实机部署并对轨迹跟踪控制器整定；实现基于高斯过程数据驱动的模型预测控制（MPC）与基于干扰观测器（ESO）的 MPC 系统，获综合赛二等奖。",
        en: "Deployed VINS-Fusion localization and Ego-Planner planning on Jetson ORIN NX; tuned the attitude estimator and cascaded-PID attitude controller; deployed the LQR controller on hardware and tuned the trajectory tracker; implemented Gaussian-process data-driven MPC and an ESO-based MPC system. Won Second Prize."
      }
    }
  ],

  /* 学习 / 工作经历：按时间倒序 */
  experience: [
    {
      period: "2025.07 – 至今",
      org:    { zh: "招商局狮子山人工智能实验室", en: "Lion Rock AI Lab, China Merchants Group" },
      role:   { zh: "算法工程师", en: "Algorithm Engineer" },
      desc:   { zh: "负责四足与轮足机器人强化学习运动控制：GO2 四足机器人注意力感知运控（梅花桩全地形实机部署），自研轮足机器人从 0 到 1 算法落地（爬楼梯、高台越障、自身体重负载实机测试）。", en: "Led RL-based locomotion control for quadruped and wheel-legged robots: attention-based perceptive locomotion on Unitree GO2 (plum-blossom-pile deployment), and end-to-end algorithm delivery for an in-house wheel-legged robot (stair climbing, obstacle crossing, full-body-weight payload testing)." }
    },
    {
      period: "2024.06 – 2024.10",
      org:    { zh: "小鹏汽车 · 机器人中心（实习）", en: "XPeng Robotics (Internship)" },
      role:   { zh: "运动控制算法工程师", en: "Motion Control Algorithm Engineer" },
      desc:   { zh: "PX5 人形机器人：VR 遥操作（通讯方案、状态机、MuJoCo 仿真、实机调试）；贝塞尔步态规划与 smart gait 切换、直膝行走调优；电机执行器性能摸底与 PVT 控制器整定。", en: "PX5 humanoid robot: VR teleoperation (communication design, state machine, MuJoCo simulation, hardware tuning); Bézier gait planning, smart-gait switching, and straight-knee walking; motor-actuator characterization and PVT controller tuning." }
    },
    {
      period: "2023.04 – 2023.10",
      org:    { zh: "大疆创新 · 车载自动驾驶（实习）", en: "DJI Automotive (Internship)" },
      role:   { zh: "整车开发工程师", en: "Vehicle Development Engineer" },
      desc:   { zh: "基于 A-SPICE 的正向开发：代码静态检查与 Coverity 扫描修复、Cantata 单元测试、gdb 集成调试；AUTOSAR 嵌入式开发与 CAN 通讯验证；车辆执行器性能摸底与开环验收。", en: "A-SPICE forward development: static code checks, Coverity remediation, Cantata unit tests, gdb integration debugging; AUTOSAR embedded development and CAN communication validation; vehicle actuator characterization and open-loop acceptance." }
    },
    {
      period: "2022.09 – 2025.06",
      org:    { zh: "电子科技大学", en: "University of Electronic Science and Technology of China (UESTC)" },
      role:   { zh: "电子信息 · 硕士", en: "M.S. in Electronic Information" },
      desc:   { zh: "获 2023 全国大学生机器人大赛 RoboMaster 全国二等奖、大疆赛事精英奖金等。", en: "Won Second Prize in the 2023 RoboMaster competition and the DJI Elite Competition Award." }
    },
    {
      period: "2021.06 – 2021.09",
      org:    { zh: "美的集团 · 中央研究院（实习）", en: "Midea Corporate Research Center (Internship)" },
      role:   { zh: "机器人工程师", en: "Robotics Engineer" },
      desc:   { zh: "UR5 视觉机械臂复合机器人 AMR：正逆运动学与规划控制；三次 B 样条局部路径规划；速度/位置环串级 PID，实现边夹取边移动协同控制。", en: "UR5 vision-manipulator AMR: kinematics and planning; cubic B-spline local planning; cascaded velocity/position PID for simultaneous pick-and-move coordination." }
    },
    {
      period: "2018.09 – 2022.06",
      org:    { zh: "广东工业大学", en: "Guangdong University of Technology" },
      role:   { zh: "自动化 · 本科", en: "B.S. in Automation" },
      desc:   { zh: "ROBOCON 校队电控组组长；“挑战杯”全国一等奖；国家励志奖学金（2019–2021）。", en: "Electronics team lead of the ROBOCON team; First Prize in the \"Challenge Cup\"; National Endeavor Scholarship (2019–2021)." }
    }
  ],

  /* 荣誉奖项 */
  honors: [
    {
      year: "2020",
      zh: "全国大学生机器人大赛 RoboCon 全国一等奖（全国季军）",
      en: "First Prize (3rd place), National College Robot Competition RoboCon"
    },
    {
      year: "2023",
      zh: "全国大学生机器人大赛 RoboMaster 全国二等奖",
      en: "Second Prize, National College Robot Competition RoboMaster"
    },
    {
      year: "2021",
      zh: "“挑战杯”全国大学生课外学术科技作品竞赛全国一等奖",
      en: "First Prize, national \"Challenge Cup\" academic competition"
    },
    {
      year: "2020",
      zh: "全国大学生节能减排社会实践与科技竞赛全国三等奖",
      en: "Third Prize, National Energy Conservation & Emission Reduction Competition"
    },
    {
      year: "2020",
      zh: "大疆 RoboMaster“智在飞翔”无人飞行器智能感知技术竞赛综合赛二等奖",
      en: "Second Prize, DJI RoboMaster \"ZhiZai FeiXiang\" drone intelligent-perception competition"
    },
    {
      year: "2019–2021",
      zh: "国家励志奖学金（连续三年）",
      en: "National Endeavor Scholarship (3 consecutive years)"
    },
    {
      year: "2022",
      zh: "优秀学生一等奖学金",
      en: "First-Class Excellent Student Scholarship"
    },
    {
      year: "",
      zh: "康延学业优秀奖学金、大学生智能工匠奖学金、方直奖学金",
      en: "Kangyan Academic Scholarship, Smart Craftsman Scholarship, Fangzhi Scholarship"
    }
  ],

  /* 论文（可选）：没有论文就留空数组 []，整个板块会自动隐藏 */
  publications: [],

  /* 页脚版权信息 */
  footer: {
    zh: "© 2025 林镇标 · 保留所有权利",
    en: "© 2025 Zhenbiao Lin · All rights reserved"
  }
};
