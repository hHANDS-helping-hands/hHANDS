const generateData = (n) => {
  name = [
    "Aditya",
    "Vinay",
    "Vijeet",
    "Rahul",
    "Tarun",
    "Tanmay",
    "Ashish",
    "Masoom",
    "Mayank",
    "Manish",
    "Vijay",
    "Sulekha",
    "Vaishnavi",
    "Priya",
    "Pinki",
  ];
  time = ["10s", "1hr", "5min", "3day", "2month"];
  location = [18.5204, 73.8567];
  problem = ["need food", "need to be rescued"];
  description = [
    "Our bodies need regular intakes of food for the following reasons:To produce energy to allow us to breathe, think and moveTo grow/reproduceTo carry out repairs (e.g. to heal a cut on your arm or a broken bone)The major components of food that allow our bodies to carry out these functions are called nutrients. Click here for more information about nutrients in food.",
  ];
  video = ["null"];
  accountDetails = [
    {
      accountNo: 6565234435,
      ifscCode: "icici1456",
      holderName: "Abhijeet Kumar",
    },
  ];
  data = [];
  for (var i = 0; i < n; i++) {
    data.push({
      name: name[parseInt(Math.random() * name.length)],
      time: time[parseInt(Math.random() * time.length)],
      location: [18.5204, 73.8567],
      problem: problem[parseInt(Math.random() * problem.length)],
      description: description,
      video: video,
      accountDetails: accountDetails[0],
      key: i + "",
    });
  }
  data.push({ key: i + 1 + "" });

  return data;
};

export default generateData;
