import { prisma } from "@utils/prisma";
import { faker } from "@faker-js/faker";
import { Branch, Role } from "@prisma/client";
import { defaultProfilePic } from "@utils/img";

//? TO RUN THIS FILE `yarn seed`

//* TO SEED THE DATABASE WITH FAKE MENTOR/MENTEE DATA.
Array.from({ length: 100 }).map(async () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let role: Role;
  if (randomNumber < 50) {
    role = "MENTEE";
  } else {
    role = "MENTOR";
  }
  //! THERE MAYBE UNIQUE FIELD ERROR BECAUSE OF RANDOM SCHOLAR ID.
  //! IGNORE AND RUN THE FILE AGAIN, YOU WILL HAVE ENOUGH DATA
  const randomScholarNumber =
    10000 +
    Math.floor(Math.random() * 200) +
    Math.floor(Math.random() * 10) * 1000 +
    (Math.floor(Math.random() * 4) + 18) * 100000;
  const name = faker.name.findName();
  const branches = ["CSE", "ECE", "EIE", "EE", "ME", "CE"];
  const branch = branches[
    Math.floor(Math.random() * branches.length)
  ] as Branch;
  await prisma.user.create({
    data: {
      name,
      scholarId: randomScholarNumber,
      role,
      email: faker.internet.email(name),
      password: faker.random.alphaNumeric(30),
      dob: new Date(faker.date.past()),
      img: defaultProfilePic(name),
      branch,
      otpValue: faker.random.alphaNumeric(),
      otpExpiry: faker.date.past(),
      verified: true,
    },
  });
});
