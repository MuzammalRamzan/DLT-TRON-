const Ajwa=artifacts.require('./Ajwa.sol');
// const Ajwa1=artifacts.require('./Ajwa1.sol');

module.exports=function(deployer){
    deployer.deploy(Ajwa,1000000,1000000000000000);
    // .then(function(){
    //     var tokenPrice = 1000000000000000;
    // return  deployer.deploy(Ajwa1 , Ajwa.address,tokenPrice);

    // });
};