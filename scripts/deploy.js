async function main() {
  // Get the signer of the tx and address for deploying contracts
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  console.log("\n=== Starting OpenLabNetwork Deployment ===\n");

  // Deploy main OpenLabNetwork contract
  console.log("1. Deploying OpenLabNetwork...");
  const OpenLabNetwork = await ethers.getContractFactory("OpenLabNetwork", deployer);
  const openLabNetwork = await OpenLabNetwork.deploy(deployer.address);
  console.log("OpenLabNetwork deployed at:", openLabNetwork.target);

  // Deploy MilestoneManager
  console.log("\n2. Deploying OpenLabMilestoneManager...");
  const MilestoneManager = await ethers.getContractFactory("OpenLabMilestoneManager", deployer);
  const milestoneManager = await MilestoneManager.deploy(
    openLabNetwork.target,
    deployer.address
  );
  console.log("OpenLabMilestoneManager deployed at:", milestoneManager.target);

  // Deploy PublicationManager
  console.log("\n3. Deploying OpenLabPublicationManager...");
  const PublicationManager = await ethers.getContractFactory("OpenLabPublicationManager", deployer);
  const publicationManager = await PublicationManager.deploy(
    openLabNetwork.target,
    deployer.address
  );
  console.log("OpenLabPublicationManager deployed at:", publicationManager.target);

  // Deploy FundingPoolManager
  console.log("\n4. Deploying OpenLabFundingPoolManager...");
  const FundingPoolManager = await ethers.getContractFactory("OpenLabFundingPoolManager", deployer);
  const fundingPoolManager = await FundingPoolManager.deploy(
    openLabNetwork.target,
    deployer.address
  );
  console.log("OpenLabFundingPoolManager deployed at:", fundingPoolManager.target);

  // Deploy AnalyticsManager
  console.log("\n5. Deploying OpenLabAnalyticsManager...");
  const AnalyticsManager = await ethers.getContractFactory("OpenLabAnalyticsManager", deployer);
  const analyticsManager = await AnalyticsManager.deploy(
    openLabNetwork.target,
    deployer.address
  );
  console.log("OpenLabAnalyticsManager deployed at:", analyticsManager.target);

  // Configure AnalyticsManager with other contract addresses
  console.log("\n6. Configuring AnalyticsManager...");
  await analyticsManager.setMilestonesContract(milestoneManager.target);
  await analyticsManager.setPublicationsContract(publicationManager.target);
  console.log("AnalyticsManager configured successfully");

  console.log("\n=== Deployment Summary ===");
  console.log("OpenLabNetwork:", openLabNetwork.target);
  console.log("MilestoneManager:", milestoneManager.target);
  console.log("PublicationManager:", publicationManager.target);
  console.log("FundingPoolManager:", fundingPoolManager.target);
  console.log("AnalyticsManager:", analyticsManager.target);
  console.log("Deployer:", deployer.address);

  // Save deployment info to file
  const fs = require('fs');
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      OpenLabNetwork: openLabNetwork.target,
      OpenLabMilestoneManager: milestoneManager.target,
      OpenLabPublicationManager: publicationManager.target,
      OpenLabFundingPoolManager: fundingPoolManager.target,
      OpenLabAnalyticsManager: analyticsManager.target
    }
  };

  fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
  console.log("\nDeployment info saved to deployment-info.json");

  console.log("\n=== Next Steps ===");
  console.log("1. Register as a researcher:");
  console.log(`   await openLabNetwork.registerResearcher("Your Name", "ipfs://profile", [0])`);
  console.log("2. Grant roles to other users:");
  console.log(`   await openLabNetwork.grantRole(await openLabNetwork.REVIEWER_ROLE(), "0x...")`);
  console.log("3. Create a funding pool:");
  console.log(`   await fundingPoolManager.createFundingPool("Pool Name", 0, 100, 1000000, {value: ethers.parseEther("1")})`);
  console.log("4. Propose your first project!");
}

main().catch(console.error);