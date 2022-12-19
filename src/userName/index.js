const usernameCli = process.argv.find(name => name.includes('--username'));
export const getUserName = () => {
  const userName = usernameCli.replace('--username=', '');

  return userName[0].toUpperCase() + userName.slice(1);
};


