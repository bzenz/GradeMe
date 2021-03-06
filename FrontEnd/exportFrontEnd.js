const { exec } = require('child_process');
const move = require('./utils/move');
const rimraf = require('rimraf');

const buildReactApp = () => 
{
    // Build and bundle React App
    console.log('Building React App...');
    exec('npm run build', (error, stdout, stderr) => 
    {
        if (error) 
        {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) 
        {
            console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);

        console.log('React Native App was build');
        deleteOldClient();

    });
};

const deleteOldClient = () => 
{
    // delete old clientexport
    console.log('Deleting old clientexport...');
    rimraf('../BackEnd/client', error => 
    {
        if (error) 
        {
            console.log(`error: ${error}`);
            return;    
        }

        console.log('Old clientexport deleted');
        moveBundle();
    });
};


const moveBundle = () => 
{
    // Move bundle to server destination
    console.log('Moving bundle to server destination...');
    move('web-build', '../BackEnd/client', error => 
    {
        if (error) 
        {
            console.log(`error: ${error}`);
            return;    
        }
        
        console.log('Bundle moved.');
        finish();
    });
};

const finish = () => 
{
    console.log('\nFrontend successfully exported! \n\n');
};


buildReactApp();
