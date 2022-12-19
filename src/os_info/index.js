import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

const getEol = async () => {
  console.log( `default system End-Of-Line is ${JSON.stringify(EOL)}` );
};

const getCpus = async () => {
  const cors = cpus().reduce((acc, item) => {
    acc.push({ model: item.model,  speed: item.speed / 1000});
    return acc;
  },[]);
  
  console.log( `amount of CPUS: ${cors.length}` );
  console.table(cors);
};

const getHomeDir = async () => {
  console.log( 'home directory is ' + homedir() );
};

const getUserName = async () => {
  console.log( 'system user name is ' + userInfo().username );
};

const getCPUArchitecture = async () => {
  console.log( 'CPU architecture is ' + arch());
};

export const osCommandHandler = async (command) => {
  try {
    switch (command) {
      case '--EOL': await getEol();
      break;
      case '--cpus': await getCpus();
      break;
      case '--homedir': await getHomeDir();
      break;
      case '--username': await getUserName();
      break;
      case '--architecture': await getCPUArchitecture();
      break;
      default: console.log('You wrote wrong command OS');
    }
  } catch (err) {
    console.log(err);
  }
};