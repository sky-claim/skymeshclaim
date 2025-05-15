
const contractAddress = "0x07452Cd44Cfb4Eec601B8a452999d3A4C03cC2B5"; // ← Twój adres kontraktu
const abi = [
  "function claim(string memory code) public",
];

async function claimCode() {
  const status = document.getElementById("status");
  const code = document.getElementById("codeInput").value.trim();
  if (!code) {
    status.innerText = "Please enter a code.";
    return;
  }

  if (!window.ethereum) {
    status.innerText = "MetaMask not detected.";
    return;
  }

  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.claim(code);
    await tx.wait();
    status.innerText = "Claim successful!";
  } catch (err) {
    console.error(err);
    status.innerText = "Claim failed. Code invalid or already used.";
  }
}
