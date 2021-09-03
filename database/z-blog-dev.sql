/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.7.32-log : Database - zy-blog-dev
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`zy-blog-dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `zy-blog-dev`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `title` varchar(500) DEFAULT NULL COMMENT '标题',
  `content` text COMMENT '文章',
  `type` varchar(255) DEFAULT NULL COMMENT '类型',
  `cover` varchar(255) DEFAULT NULL COMMENT '封面',
  `adjunct` varchar(500) DEFAULT NULL COMMENT '附件',
  `status` varchar(2) DEFAULT '99' COMMENT '上架状态 10=上架中，99=下架中',
  `deleted` varchar(2) DEFAULT '00' COMMENT '删除标记',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `brief` text COMMENT '摘要',
  `top` varchar(2) DEFAULT '99' COMMENT '置顶状态 10=已置顶，99=未置顶',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `article` */

insert  into `article`(`uid`,`title`,`content`,`type`,`cover`,`adjunct`,`status`,`deleted`,`created_at`,`updated_at`,`brief`,`top`) values ('1630462092926','中秋国庆都加班，加班工资怎么算？答案来了！','<p style=\"margin-left:0px;text-align:justify;\">值得注意的是，</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">9月18日（周六）、</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">9月26日（周日）以及10月9日（周六）均需上班。</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">双节即将到来，</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">有职工仍因工作需要，</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">得坚守岗位。</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">那么，</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">如果不补休，</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">加班工资该拿多少？</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">北京拙朴律师事务所律师谢燕平在接受《工人日报》记者采访时表示，<strong>今年9月21日（中秋节）、10月1日、2日、3日（国庆节）这4天是法定节假日，法律不允许调休，只要安排加班，就应当支付不低于300%工资（月工资基数÷21.75天×300%×加班天数）。</strong></p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\"><strong>9月19日、20日，10月4日、5日、6日、7日这6天是用休息日调休过来的，如果安排加班不能安排补休的，应当支付不低于200%工资（月工资基数÷21.75天×200%×加班天数）。</strong></p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\"><strong>如果这10天全部加班，算下来是24倍的工资，可以理解为加班10天拿到24天工资。</strong></p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;\">&nbsp;</p><p style=\"margin-left:0px;text-align:justify;\">《劳动法》第四十一条规定<span style=\"color:rgb(153,153,153);\">“用人单位由于生产经营需要，经与工会和劳动者协商后可以延长工作时间，一般每日不得超过一小时；因特殊原因需要延长工作时间的，在保障劳动者身体健康的条件下延长工作时间每日不得超过三小时，但是每月不得超过三十六小时。”</span></p>','10','/upload/article/image/20210901/4b4304a9a4409ebe3594de3d32a3a4ab.jpg','','10','00','2021-09-01 10:08:12','2021-09-01 10:08:16',NULL,'99'),('1630462176351','载鸿蒙系统：华为推出首款迷你LED智慧屏','<p style=\"margin-left:0px;\"><span style=\"color:rgb(51,51,51);\"><strong>参考消息网9月1日报道</strong></span>据韩国ZDnet新闻网近日报道，华为不久前推出其首款迷你LED智慧屏V 75 Super。这款智慧屏采用了华为自己的操作系统鸿蒙OS 2。</p><p style=\"margin-left:0px;\">华为介绍称，该智慧屏采用了“超迷你LED”显示屏技术。75英寸的屏幕上最多安装了46080颗超级迷你LED光源，能提高画质，形成自然的色彩表面。另外，V 75 Super还拥有20个单元组成的音响系统，可媲美电影音响效果。</p><p style=\"margin-left:0px;\">华为智慧屏的迷你LED光源数量超过了市场上其他品牌的迷你LED光源数量。三星电子和LG电子的迷你LED电视屏幕分别为85英寸和86英寸，使用3万个左右的光源，而华为则使用4万个以上的迷你LED光源。中国小米82英寸迷你LED电视屏幕则使用约1.5万个光源。</p><p style=\"margin-left:0px;\">报道称，三星电子、TCL、创维、海信、飞利浦、LG电子等电视品牌都已经推出迷你LED背光液晶电视，此次华为也加入其中。（编译/李克宽）</p>','10','/upload/article/image/20210901/0472e872b3047b8c7f2b6758358475c1.jpeg','','10','00','2021-09-01 10:09:36','2021-09-01 10:09:39',NULL,'99'),('28dc3270-f9ad-11eb-a1d1-777c10e1d786','测试','<p>测试</p>','10','/upload/article/image/20210810/38459af21190918b10016fb92053db15.jpeg','/upload/article/file/20210810/gitee2.svg','99','01','2021-08-10 15:32:47','2021-08-10 15:36:40',NULL,'99'),('6178b3c0-f9b1-11eb-a1d1-777c10e1d786','NVIDIA发布RTX A2000专业卡：安培家族最迷你显卡降临','<p><img class=\"image_resized image-style-align-left\" style=\"width:383px;\" src=\"/proxy_api_prefix_B/upload/ckeitor/20210811/ab8af1ff96e7e81fda6cf108b9fa8a5b.jpeg\"><span class=\"text-small\">今天NVIDIA又发布了一款RTX显卡——RTX A2000，这是一款面向桌面工作站的专业卡，也是安培家族中最迷你的，体积只有RTX 3090显卡的一半。</span></p><p style=\"margin-left:0px;\"><span class=\"text-small\">RTX A2000也是NVIDIA目前最便宜的光追专业卡，上代专业卡中支持RTX的门槛是RTX 4000上，现在的RTX A2000定位更低，售价在450美元左右，也是专业卡中最便宜的。</span></p><p style=\"margin-left:0px;\"><span class=\"text-small\">设计上，RTX A2000也是家族中第一款采用刀版设计的，涡轮单风扇半高设计，TDP功耗只有70W，体积只有RTX 3090显卡的一半。</span></p><p style=\"margin-left:0px;\"><span class=\"text-small\">规格上，RTX A2000差不多就是桌面版RTX 3060的水平，也是GA106核心，但频率更低，3328个CUDA核心，104个张量核心，频率降低到了1200MHz，搭配192bit GDDR6显存，容量6GB，支持ECC，频率也降至12Gbps。</span></p><p style=\"margin-left:0px;\"><span class=\"text-small\">RTX A2000专业卡将于10月份开卖，售价450美元。</span></p><p>&nbsp;</p><figure class=\"image\"><img src=\"/proxy_api_prefix_B/upload/ckeitor/20210811/12f4f6cf6d94cf64bb3a717a05355bf0.jpeg\"></figure>','20','/upload/article/image/20210810/86d87f5870c9cde2191e930447e457db.jpeg','/upload/article/file/20210810/微信截图_20210705093022.png','10','00','2021-08-10 16:03:00','2021-08-12 17:09:47','今天NVIDIA又发布了一款RTX显卡——RTX A2000，这是一款面向桌面工作站的专业卡，也是安培家族中最迷你的，体积只有RTX 3090显卡的一半。\n规格上，RTX A2000差不多就是桌面版RTX 3060的水平，也是GA106核心，但频率更低，3328个CUDA核心，104个张量核心，频率降低到了1200MHz，搭配192bit GDDR6显存，容量6GB，支持ECC，频率也降至12Gbps。','99'),('6992c030-f9a4-11eb-a3a2-59dc7f090b6d','微信、支付宝小程序通过页面劫持，变更生命周期、权限验证、埋点及挂载通用方法','<pre><code class=\"language-javascript\">const STORAGE_PREFIX = \'USE_GLOBAL_STATE_\';\r\nconst storageData = {};\r\n \r\n/**\r\n * 对state进行格式化\r\n * @param {*} storage \r\n */\r\nfunction initStorageData(storage) {\r\n  const { keys = [] } = storage || {};\r\n  const now = new Date().getTime();\r\n  for (let i = 0; i &lt; keys.length; i++) {\r\n    let key = keys[i];\r\n    if (key.indexOf(STORAGE_PREFIX) === 0) {\r\n      let result = my.getStorageSync({ key }) || {};\r\n      let value = result.data;\r\n      try {\r\n        value = JSON.parse(value);\r\n        if (!value.timeout || now - value.time &lt; value.timeout) {\r\n          let storageKey = key.substring(STORAGE_PREFIX.length);\r\n          storageData[storageKey] = value.state;\r\n        } else {\r\n          my.removeStorageSync({\r\n            key\r\n          });\r\n        }\r\n      } catch (e) { }\r\n    }\r\n  }\r\n}\r\n \r\n//初始化一次\r\ninitStorageData(my.getStorageInfoSync());\r\n \r\n//设置缓存位置，及过期时间\r\nconst defaultOptions = {\r\n  storage: null, //local\r\n  storageTimeout: 0\r\n};\r\n \r\n//获取全局数据\r\nfunction getGlobalState(name) {\r\n  return storageData[name];\r\n}\r\n \r\nfunction setGlobalState(name, state, options = {}) {\r\n  storageData[name] = state;\r\n  if (options.storage === \'local\') {\r\n    my.setStorageSync({\r\n      key: STORAGE_PREFIX + name,\r\n      data: JSON.stringify({\r\n        state,\r\n        timeout: options.storageTimeout,\r\n        time: new Date().getTime(),\r\n      })\r\n    });\r\n  }\r\n}\r\n \r\nexport default (defaultState, key, options) =&gt; {\r\n  if (typeof key === \'undefined\' &amp;&amp; typeof options === \'undefined\') {\r\n    key = defaultState;\r\n    defaultState = undefined;\r\n  } else if (typeof key === \'object\' &amp;&amp; typeof options === \'undefined\') {\r\n    options = key;\r\n    key = defaultState;\r\n    defaultState = undefined;\r\n  }\r\n \r\n  options = {\r\n    ...defaultOptions,\r\n    ...options,\r\n  };\r\n \r\n  const getState = () =&gt; {\r\n    return getGlobalState(key);\r\n  }\r\n \r\n  // let state = getState();\r\n \r\n  const setState = (newState) =&gt; {\r\n    setGlobalState(key, newState, options);\r\n    // state = newState;\r\n  };\r\n \r\n  return [getState, setState];\r\n};</code></pre><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>','10','/upload/article/image/20210810/38459af21190918b10016fb92053db15.jpeg','/upload/article/file/20210810/gitee2.svg','10','00','2021-08-10 14:30:10','2021-08-11 16:34:23','微信、支付宝小程序通过页面劫持，变更生命周期、权限验证、埋点及挂载通用方法','10');

/*Table structure for table `article_log` */

DROP TABLE IF EXISTS `article_log`;

CREATE TABLE `article_log` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `art_id` varchar(36) DEFAULT NULL COMMENT '文章id',
  `ip` varchar(36) DEFAULT NULL COMMENT 'ip',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `article_log` */

insert  into `article_log`(`uid`,`art_id`,`ip`,`created_at`,`updated_at`) values ('276c6a40-0ace-11ec-882d-73770392423f','1630462176351','10.43.31.188','2021-09-01 10:41:48','2021-09-01 10:41:48'),('8210dc10-0ac9-11ec-882d-73770392423f','1630462092926','10.43.31.188','2021-09-01 10:08:32','2021-09-01 10:08:32'),('b7bb0de0-0155-11ec-9d23-f96128434633','6992c030-f9a4-11eb-a3a2-59dc7f090b6d','10.43.31.188','2021-08-20 09:27:00','2021-08-20 09:27:00'),('d851af90-0156-11ec-a4f4-5567bde765e0','6178b3c0-f9b1-11eb-a1d1-777c10e1d786','10.43.31.188','2021-08-20 09:35:04','2021-08-20 09:35:04');

/*Table structure for table `article_to_class` */

DROP TABLE IF EXISTS `article_to_class`;

CREATE TABLE `article_to_class` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `art_id` varchar(36) DEFAULT NULL COMMENT '文章id',
  `class_id` varchar(36) DEFAULT NULL COMMENT '分类id',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `article_to_class` */

insert  into `article_to_class`(`uid`,`art_id`,`class_id`) values ('28fc8bb0-f9ad-11eb-a1d1-777c10e1d786','28dc3270-f9ad-11eb-a1d1-777c10e1d786','6dbf7060-f998-11eb-a285-9bfb660f3a22'),('76410680-0ac9-11ec-882d-73770392423f','1630462092926','73636200-0ac9-11ec-882d-73770392423f'),('a80a8a10-0ac9-11ec-882d-73770392423f','1630462176351','73636200-0ac9-11ec-882d-73770392423f'),('cf284ad0-fa64-11eb-a0d0-b7f60e0333e6','6992c030-f9a4-11eb-a3a2-59dc7f090b6d','6dbf7060-f998-11eb-a285-9bfb660f3a22'),('cf284ad1-fa64-11eb-a0d0-b7f60e0333e6','6992c030-f9a4-11eb-a3a2-59dc7f090b6d','a00e1890-f98f-11eb-a285-9bfb660f3a22'),('d2beedf0-fb47-11eb-ad2f-edbd4e0539be','6178b3c0-f9b1-11eb-a1d1-777c10e1d786','6dbf7060-f998-11eb-a285-9bfb660f3a22');

/*Table structure for table `article_to_label` */

DROP TABLE IF EXISTS `article_to_label`;

CREATE TABLE `article_to_label` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `art_id` varchar(36) DEFAULT NULL COMMENT '文章id',
  `label_id` varchar(36) DEFAULT NULL COMMENT '标签id',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `article_to_label` */

insert  into `article_to_label`(`uid`,`art_id`,`label_id`) values ('290628a0-f9ad-11eb-a1d1-777c10e1d786','28dc3270-f9ad-11eb-a1d1-777c10e1d786','6ff805d0-f999-11eb-a285-9bfb660f3a22'),('764b66c0-0ac9-11ec-882d-73770392423f','1630462092926','73efea90-0ac9-11ec-882d-73770392423f'),('a8142700-0ac9-11ec-882d-73770392423f','1630462176351','73efea90-0ac9-11ec-882d-73770392423f'),('cf339570-fa64-11eb-a0d0-b7f60e0333e6','6992c030-f9a4-11eb-a3a2-59dc7f090b6d','6ff805d0-f999-11eb-a285-9bfb660f3a22'),('d2cafbe0-fb47-11eb-ad2f-edbd4e0539be','6178b3c0-f9b1-11eb-a1d1-777c10e1d786','6ff805d0-f999-11eb-a285-9bfb660f3a22');

/*Table structure for table `classify` */

DROP TABLE IF EXISTS `classify`;

CREATE TABLE `classify` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `remark` varchar(255) DEFAULT NULL COMMENT '描述',
  `cover` varchar(255) DEFAULT NULL COMMENT '封面',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` varchar(2) DEFAULT '00' COMMENT '删除标记',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `classify` */

insert  into `classify`(`uid`,`name`,`remark`,`cover`,`created_at`,`updated_at`,`deleted`) values ('6dbf7060-f998-11eb-a285-9bfb660f3a22','html',NULL,'/icon/label/5.svg','2021-08-10 13:04:23','2021-08-10 13:04:23','00'),('73636200-0ac9-11ec-882d-73770392423f','新闻',NULL,'/icon/label/2.svg','2021-09-01 10:08:08','2021-09-01 10:08:08','00'),('a00e1890-f98f-11eb-a285-9bfb660f3a22','java',NULL,'/icon/label/2.svg','2021-08-10 12:01:22','2021-08-10 12:01:22','00'),('ade88820-fa74-11eb-9d89-133621319e58','css',NULL,'/upload/classify/image/20210811/b580ac2543d1e7c83757af5f59151954.png','2021-08-11 15:21:00','2021-08-11 15:26:48','01');

/*Table structure for table `config` */

DROP TABLE IF EXISTS `config`;

CREATE TABLE `config` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `remark` varchar(1024) DEFAULT NULL COMMENT '描述',
  `profile` text COMMENT '配置JSON',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `config` */

insert  into `config`(`uid`,`name`,`remark`,`profile`,`created_at`,`updated_at`) values ('fb57a600-eace-11eb-96b5-e73f4408ddb5','首页配置','首页Banner','{\"title\":\"ZY-Blog\",\"motto\":\"故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身\",\"cover\":\"/upload/image/index/20210805/c8db752d544cf67b7cae2908ba346883.jpeg\",\"button\":\"Enter Blog\"}','2021-07-22 17:27:06','2021-08-05 15:22:15'),('fb57a600-eace-11eb-96b5-e73f4408ddb6','底部配置','底部配置','{\"list\":[{\"content\":[{\"icon\":\"/upload/image/footer/20210805/f3692cb2f8fce7bb490e1b6684ec775a.svg\",\"text\":\" 不放弃！绝不放弃！永不放弃！\"}],\"title\":\"ZY个人博客\"},{\"content\":[{\"icon\":\"/upload/image/footer/20210805/c8966772b74fb7c3d4f719b5e5be5c56.svg\",\"text\":\"https://gitee.com/jiuwusan/z-blog\"}],\"title\":\"相关链接\"},{\"content\":[{\"icon\":\"/upload/image/footer/20210805/083c2690a8ced0677c0d8d8e162a079a.svg\",\"text\":\"ZhouKaiDong953@qq.com\"},{\"icon\":\"/upload/image/footer/20210805/1112f6e0a7325890ad7a7ab64f2a8ef9.svg\",\"text\":\"953343906\"},{\"icon\":\"/upload/image/footer/20210805/d00274b6a03503af9402f928eca072da.svg\",\"text\":\"ZkDHzR\"}],\"title\":\"联系我\"}],\"signature\":\"Copyright © 2021-2022 Zy-Blog\"}','2021-07-29 11:23:09','2021-08-05 15:23:17'),('fb57a600-eace-11eb-96b5-e73f4408ddb7','友链配置','友链配置','{\"title\":\"链接申请说明\",\"declare\":\"如需交换友链，可以在留言区留言\\n名称：ZY个人博客\\n网址：http://jiuwusan.cn/\\n图标：http://jiuwusan.cn/logo.png\\n描述：故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身\",\"warning\":\"申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)\",\"left\":\"\",\"rules\":[{\"icon\":\"/upload/image/footer/20210805/000015f11e4377dd5f57e467218f2e63.svg\",\"text\":\"经常宕机\"},{\"icon\":\"/upload/image/footer/20210805/1ed191bce9177ad2ef0f35af4c684d41.svg\",\"text\":\"稳定运行\"}]}','2021-08-04 13:31:38','2021-08-05 15:22:03'),('fb57a600-eace-11eb-96b5-e73f4408ddb8','基础配置','基础配置','{\"name\":\"ZY-Blog\",\"shortName\":\"ZY\",\"footer\":\"ZY-BLOG ©2021 Created by 九五三\",\"loginBg\":\"/upload/login/image/20210813/d84714c9479bc60b315b135e7c04198a.jpg\"}','2021-08-04 13:31:38','2021-08-13 13:45:34'),('fb57a600-eace-11eb-96b5-e73f4408ddb9','通用配置','通用配置','{\"name\":\"Zhou.Yuan\"}','2021-08-13 14:03:05','2021-08-13 14:15:26');

/*Table structure for table `diary` */

DROP TABLE IF EXISTS `diary`;

CREATE TABLE `diary` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` varchar(2) DEFAULT '00' COMMENT '删除标记',
  `image` text COMMENT '图片',
  `content` text COMMENT '内容',
  `adjunct` text COMMENT '附件',
  `overview` text COMMENT '概述',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `diary` */

insert  into `diary`(`uid`,`created_at`,`updated_at`,`deleted`,`image`,`content`,`adjunct`,`overview`) values ('3da63650-f431-11eb-9ddb-05ffeeef486e','2021-08-02 16:03:08','2021-08-02 17:21:42','01',NULL,NULL,NULL,NULL),('473591c0-f431-11eb-9ddb-05ffeeef486e','2021-08-03 16:03:25','2021-08-03 16:08:06','01',NULL,NULL,NULL,NULL),('5c56eae0-f43b-11eb-8a17-e7a7296ac63d','2021-08-03 17:15:35','2021-08-03 17:21:43','01',NULL,NULL,NULL,NULL),('5ddfcd70-f43e-11eb-8a17-e7a7296ac63d','2021-08-03 17:37:06','2021-08-04 17:31:42','01',NULL,NULL,NULL,NULL),('6a7b4250-f43c-11eb-8a17-e7a7296ac63d','2021-08-02 17:23:08','2021-08-04 17:31:43','01',NULL,NULL,NULL,NULL),('7fc2ea20-f430-11eb-9ddb-05ffeeef486e','2021-08-03 15:57:50','2021-08-03 16:02:45','01',NULL,NULL,NULL,NULL),('8611d050-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:19','2021-08-03 15:02:36','01',NULL,NULL,NULL,NULL),('89c366a0-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:25','2021-08-03 15:02:46','01',NULL,NULL,NULL,NULL),('8bdafc00-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:29','2021-08-03 15:03:26','01',NULL,NULL,NULL,NULL),('8de487a0-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:32','2021-08-03 15:04:46','01',NULL,NULL,NULL,NULL),('90a04c40-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:37','2021-08-03 15:06:02','01',NULL,NULL,NULL,NULL),('914e0020-f419-11eb-9890-5d84de35d137','2021-08-03 13:13:41','2021-08-03 16:02:26','01',NULL,NULL,NULL,NULL),('92a2fa10-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:40','2021-08-03 15:31:23','01',NULL,NULL,NULL,NULL),('94dee050-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:44','2021-08-03 15:51:36','01',NULL,NULL,NULL,NULL),('970283a0-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:47','2021-08-03 15:51:41','01',NULL,NULL,NULL,NULL),('9932aa10-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:51','2021-08-03 16:02:27','01',NULL,NULL,NULL,NULL),('9b5ae140-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:55','2021-08-03 16:02:28','01',NULL,NULL,NULL,NULL),('9d41a2a0-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:56:58','2021-08-03 15:04:29','01',NULL,NULL,NULL,NULL),('9fd6f380-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:02','2021-08-03 16:02:29','01',NULL,NULL,NULL,NULL),('a2db32d0-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:07','2021-08-03 16:02:39','01',NULL,NULL,NULL,NULL),('a53f3a80-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:11','2021-08-03 16:02:40','01',NULL,NULL,NULL,NULL),('a77cce70-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:15','2021-08-03 16:02:41','01',NULL,NULL,NULL,NULL),('a9c81e00-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:19','2021-08-03 16:02:41','01',NULL,NULL,NULL,NULL),('abf84470-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:23','2021-08-03 16:02:42','01',NULL,NULL,NULL,NULL),('ae37fb40-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:26','2021-08-03 16:02:42','01',NULL,NULL,NULL,NULL),('b86f7d90-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:44','2021-08-03 16:02:43','01',NULL,NULL,NULL,NULL),('b9a5c060-f42f-11eb-9ddb-05ffeeef486e','2021-08-03 15:52:18','2021-08-03 16:02:44','01',NULL,NULL,NULL,NULL),('bac183e0-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:47','2021-08-03 16:02:43','01',NULL,NULL,NULL,NULL),('bcd102f0-f41f-11eb-97dc-55b08c3b40c5','2021-08-03 13:57:51','2021-08-03 14:51:11','01',NULL,NULL,NULL,NULL),('becc1730-f441-11eb-8a17-e7a7296ac63d','2021-08-03 18:01:17','2021-08-04 17:31:40','01',NULL,NULL,NULL,NULL),('ddd42230-f509-11eb-917c-23aa5a1abc5d','2021-08-04 17:53:49','2021-08-05 15:26:28','00','/upload/image/diary/20210805/e914e36c0f6d6c5081cef9aecbc5e5f0.jpeg,/upload/image/diary/20210805/1ba69e0c6e479b57ce42213363518051.jpeg,/upload/image/diary/20210805/cd1e5a683d4dbbb159dda1a972657365.jpeg','博客正式开通了','/upload/file/diary/20210805/萨勒芬妮.jpeg','博客正式开通了');

/*Table structure for table `label` */

DROP TABLE IF EXISTS `label`;

CREATE TABLE `label` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `remark` varchar(255) DEFAULT NULL COMMENT '描述',
  `cover` varchar(255) DEFAULT NULL COMMENT '封面',
  `deleted` varchar(2) DEFAULT '00' COMMENT '删除标记',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `label` */

insert  into `label`(`uid`,`name`,`remark`,`cover`,`deleted`,`created_at`,`updated_at`) values ('6ff805d0-f999-11eb-a285-9bfb660f3a22','随笔',NULL,'/icon/label/25.svg','00','2021-08-10 13:11:36','2021-08-10 13:11:36'),('73efea90-0ac9-11ec-882d-73770392423f','生活',NULL,'/icon/label/17.svg','00','2021-09-01 10:08:09','2021-09-01 10:08:09');

/*Table structure for table `link` */

DROP TABLE IF EXISTS `link`;

CREATE TABLE `link` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `deleted` varchar(2) DEFAULT '00' COMMENT '删除标记',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `link` text COMMENT '链接',
  `logo` text COMMENT '图片',
  `name` text COMMENT '内容',
  `desc` text COMMENT '描述',
  `remark` text COMMENT '备注',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `link` */

insert  into `link`(`uid`,`deleted`,`created_at`,`updated_at`,`link`,`logo`,`name`,`desc`,`remark`) values ('03f1e2a0-0bb6-11ec-9f55-9b25b93e8e96','00','2021-09-02 14:21:31','2021-09-02 14:21:31','https://gitee.com/jiuwusan/z-blog','/upload/image/link/20210902/05ba126d1cab6a964ccd6c5d1eb45f97.svg','gitee','开源代码地址',NULL);

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `content` text COMMENT '内容',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `status` varchar(2) DEFAULT '88' COMMENT '状态 10=已回复，20=待回复，88=待审核，99=驳回',
  `deleted` varchar(2) DEFAULT '00' COMMENT '删除标记',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `contact` varchar(255) DEFAULT NULL COMMENT '联系方式',
  `reid` varchar(36) DEFAULT NULL COMMENT '回复id',
  `pid` varchar(36) DEFAULT NULL COMMENT '关联的父id',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `message` */

insert  into `message`(`uid`,`content`,`avatar`,`status`,`deleted`,`created_at`,`updated_at`,`nickname`,`contact`,`reid`,`pid`) values ('104a43b0-fb50-11eb-9d0a-6f66b6b3582f','<pre><code class=\"language-javascript\">async findById() {\n      let { uid } = this.$route.params || {};\n      let result = await articleApi.findById({ uid });\n      this.detailData = result;\n    }</code></pre>','/avatar/4.svg','20','00','2021-08-12 17:31:25','2021-08-12 17:31:43','测试','15330368781',NULL,NULL),('11f2fff0-f695-11eb-87a7-c9b783fdeab3','<p>测试留言</p>','/avatar/0.svg','30','01','2021-08-06 17:02:47','2021-08-09 10:26:22','周开栋','15330368781',NULL,NULL),('14941070-f8e1-11eb-9f6b-0bff35796683','<p>2021年7月，在第十四届全国学生运动会上，这支跳绳队取得3金2银1铜的成绩，金牌数、奖牌数、总分都是第一。最近，冯熙惠等12名队员入选中国跳绳国家队，将参与2021年世界跳绳锦标赛20多个项目的角逐。</p><p>眼下，队员们正在为今年的跳绳世锦赛做准备，他们希望通过自己的努力，让更多人喜欢这项运动。</p>','/avatar/4.svg','20','00','2021-08-09 15:11:56','2021-08-09 15:12:10','测试用户','953343906@qq.com',NULL,NULL),('16799fe0-f69d-11eb-bc60-6d40507867a1','<p>测试留言</p>','/avatar/1.svg','10','01','2021-08-06 18:00:11','2021-08-09 14:16:44','九五三','953343906@qq.com',NULL,NULL),('22504650-f8d9-11eb-be66-01dc696df310','<p>测试回复功能</p>','/avatar/8.svg','20','01','2021-08-09 14:15:03','2021-08-09 14:16:49','博主',NULL,'eb313c10-f8ba-11eb-9fbb-0157fcd7d70a','eb313c10-f8ba-11eb-9fbb-0157fcd7d70a'),('6f9be7b0-fb3c-11eb-b224-f963ee0066d3','<p>测试</p>','/avatar/6.svg','88','00','2021-08-12 15:10:55','2021-08-12 15:10:55','953497','15330368781',NULL,NULL),('7d94d670-f8d9-11eb-bf08-db6af4dc8e9c','<p>测试</p>','/avatar/1.svg','10','00','2021-08-09 14:17:36','2021-08-09 14:18:17','周开栋','15330368781',NULL,NULL),('95fbf040-f8d9-11eb-bf08-db6af4dc8e9c','<p>测试回复</p>','/avatar/8.svg','20','00','2021-08-09 14:18:17','2021-08-09 14:18:17','博主',NULL,'7d94d670-f8d9-11eb-bf08-db6af4dc8e9c','7d94d670-f8d9-11eb-bf08-db6af4dc8e9c'),('9d14f7b0-f8dd-11eb-9f6b-0bff35796683','<p>虽然我希望出类拔萃的小将能够在今后一个时期成为跳水的领军人物，为国家争光。但是，我更担心的会被捧杀。取得奥运冠军，首先是技术过硬，其次是心理素质过硬，还有身体条件的优势，只有多种因素做的好才会拿到金牌。关于全红婵，这次得到金牌，技术上是没说的，咱不是专业人士，不好点评；心理上，14岁的小女孩纯净的透明，没有了心理压力，发挥的就会正常，技术不走形；另外，还有一个因素不能忽视，就是全红婵的体型，14岁尚待发育，或者说刚刚发育，体型瘦小，这对压水花应该是有利的。这次奥运赛场，小丫头技压群芳，拔得头筹，为国家争得了荣誉，可喜可贺。但是，后面的路还很长很长，人会长大，思想会复杂，不会有现在的单纯，会在比赛的时候面对各种压力；人会长大，身体会发育，也会给跳水带来一些不利因素。因此，要客观对待小丫头，希望她能客服种种的不利因素，在自己的事业上走的更远，变的更强！</p>','/avatar/6.svg','10','00','2021-08-09 14:47:07','2021-08-09 14:48:17','九五三','953343906@qq.com',NULL,NULL),('b139b210-fb3c-11eb-b224-f963ee0066d3','<p>测试</p>','/avatar/4.svg','88','00','2021-08-12 15:12:45','2021-08-12 15:12:45','gs','9533222',NULL,NULL),('c6c39760-f8dd-11eb-9f6b-0bff35796683','<p style=\"margin-left:auto;text-align:justify;\">东京奥运会闭幕式上，《奥林匹克圣歌》再次响起。在高昂、空灵的歌声中，很少有人知道穿着一袭蓝衣献唱的日本歌唱家冈本知高是世界上少有的男性女高音歌手（sopranist）。</p><p style=\"margin-left:auto;text-align:justify;\">冈本知高1976年出生于日本高知县，年少时因脚病在特殊学校渡过了四年的童年时光。后来有评论认为，正是这段宝贵的时光让小冈本能够在大自然中健康成长，为他今日的成就提供滋养。</p><p style=\"margin-left:auto;text-align:justify;\">冈本从小对音乐很感兴趣，从11岁开始学习钢琴，后又学习萨克斯，高中时期加入学校管弦乐队。出人意料的是，曾经立志成为萨克斯手的他，在学生时代却发现了自己拥有女高音的独特品质，后在老师的推荐下，冈本考入日本国立音乐学院声乐系。大学毕业后，冈本又进入巴黎弗朗西斯·普朗克音乐学校深造。</p><p style=\"margin-left:auto;text-align:justify;\">冈本知高学生时代就在音乐领域崭露头角，1998年在“第九”日本首演80周年纪念再现独奏会上被评为女高音演唱家。2003年，冈本知高发行首张专辑《女高音》，这张专辑曾连续17周登上日本公信榜专辑排行榜。</p><p style=\"margin-left:auto;text-align:justify;\">冈本知高的音乐表现风格多样，他可以演唱巴洛克式的宗教歌曲、歌剧、古典、音乐剧和流行歌曲。除了和日本国内的管弦乐团合作外，他还与莫斯科爱乐、英国皇家爱乐等海外乐团合作。</p>','/avatar/8.svg','20','00','2021-08-09 14:48:17','2021-08-09 14:48:17','博主',NULL,'9d14f7b0-f8dd-11eb-9f6b-0bff35796683','9d14f7b0-f8dd-11eb-9f6b-0bff35796683'),('d27dd800-f8af-11eb-8c47-679359bb8206','<pre><code class=\"language-javascript\">async formSubmit() {\n      this.$emit(\"submit\", this.formData);\n    }</code></pre><p>代码是否有错？</p><p>&nbsp;</p><p>&nbsp;</p>','/avatar/3.svg','10','01','2021-08-09 09:19:19','2021-08-09 14:16:45','张三','861987380@qq.com',NULL,NULL),('e061f350-fb3b-11eb-b224-f963ee0066d3','<p>8月7日晚间，微信表示，<strong>北京市海淀区人民检察院</strong>接群众举报对微信青少年模式<strong>调查</strong>并发出公告后，<strong>微信</strong>第一时间向检察机关及监管部门做了专项汇报，并切实了解到<strong>视频号“青少年模式”在时间管理、权限管理等功能上需要优化</strong>。</p><p>微信表示，<strong>将持续优化产品体验，升级以下三项措施：</strong></p><p>1、强化视频号青少年模式弹窗提示功能，并持续丰富视频号青少年专属内容池建设；</p><p>2、优化青少年模式的开启或关闭操作，提供更多强验证方式；</p><p>3、完善视频号青少年模式下的使用时长限制及宵禁功能。</p>','/avatar/4.svg','88','00','2021-08-12 15:06:55','2021-08-12 15:06:55','测试002','15330368781',NULL,NULL),('e2623ab0-fb3c-11eb-b224-f963ee0066d3','<p>fffff</p>','/avatar/2.svg','88','00','2021-08-12 15:14:07','2021-08-12 15:14:07','fff','ffff',NULL,NULL),('eb313c10-f8ba-11eb-9fbb-0157fcd7d70a','<p>你好呀，我能直接使用源码吗</p><p>&nbsp;</p><p>&nbsp;</p>','/avatar/7.svg','10','01','2021-08-09 10:38:45','2021-08-09 14:16:47','李四','861987380@qq.com',NULL,NULL);

/*Table structure for table `resume` */

DROP TABLE IF EXISTS `resume`;

CREATE TABLE `resume` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `contact` text COMMENT '联系方式',
  `information` text COMMENT '基本信息',
  `lcm` text COMMENT '详细内容',
  `deleted` varchar(2) DEFAULT '00' COMMENT '删除标记',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `resume` */

/*Table structure for table `resume_record` */

DROP TABLE IF EXISTS `resume_record`;

CREATE TABLE `resume_record` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `name` text COMMENT '名称',
  `remark` text COMMENT '备注',
  `deleted` varchar(2) DEFAULT '00' COMMENT '删除标记',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `resume_record` */

insert  into `resume_record`(`uid`,`name`,`remark`,`deleted`,`created_at`,`updated_at`) values ('10C0155C26DA07F4C1F6539C9485DE0F','上海xx公司','上海xx公司','00','2021-09-02 14:42:28','2021-09-02 14:42:28');

/*Table structure for table `tag` */

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `remark` varchar(1024) DEFAULT NULL COMMENT '描述',
  `cover` varchar(255) DEFAULT NULL COMMENT '封面',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tag` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一标识',
  `username` varchar(255) DEFAULT NULL COMMENT '账号',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `nickname` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  `realname` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `phone` varchar(50) DEFAULT NULL COMMENT '手机号码',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像路径',
  `salt` varchar(20) DEFAULT NULL COMMENT '盐加密',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `login_at` datetime DEFAULT NULL COMMENT '最后登录时间',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `update_by` varchar(50) DEFAULT NULL COMMENT '更新者',
  `deleted` varchar(2) DEFAULT NULL COMMENT '删除标记',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`uid`,`username`,`password`,`nickname`,`realname`,`email`,`phone`,`avatar`,`salt`,`remark`,`login_at`,`create_by`,`update_by`,`deleted`,`created_at`,`updated_at`) values ('zy','zhouyuan','01F77CA335E965B9429BF93980CA0009',NULL,NULL,NULL,NULL,NULL,'ZYZY',NULL,NULL,NULL,NULL,NULL,'0000-00-00 00:00:00','2021-08-13 11:08:59');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
