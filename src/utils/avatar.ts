const avatarBasePath = '/images/headshots/';

const selectHeadshotBg = 'custom-bg';

const systemHeadshots = ['01', '02', '03', '04', '05', '06', '07'];

export const getAllSysAvatarCodes = () => [...systemHeadshots];

/** 获取指定头像地址 */
export const getSysAvatar = (code: string) => {
  if (code === selectHeadshotBg) {
    return `${avatarBasePath}${selectHeadshotBg}.svg`;
  }

  if (systemHeadshots.includes(code)) {
    return `${avatarBasePath}${code}.svg`;
  }

  return '';
};

/** 随机获取一个系统头像地址 */
export const getRandomSysAvatar = () => {
  const index = Math.floor(Math.random() * 99999) % systemHeadshots.length;
  return systemHeadshots[index];
};
