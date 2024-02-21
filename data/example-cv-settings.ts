import { type Cv, LEVELS } from '~/types/cvfy';

export const cvSettingTemplate: Cv = {
  jobTitle: 'Deputy Director Parks Department',
  name: 'Leslie',
  lastName: 'Knope',
  email: 'lknope@parksdept.com',
  location: 'Pawnee, Indiana',
  phoneNumber: '317-660-2160',
  aboutme:
    "My name is Leslie Knope. I am a passionate, over-achieving government employee who believes the government's #1 job is serving the people. By pairing the right people with the right messaging at the right time, the parks department and your local government can make the world a better place for everyone! I have met Joe Biden, and one day I will become the first female President of the United States.",
  jobSkills: ['Microsoft', 'Word', 'Excel', 'PerfectMind'],
  softSkills: ['Positivity', 'Leadership', 'Public Speaking'],
  languages: [{ lang: 'English', level: LEVELS[4] }],
  linkedin: '',
  twitter: '',
  github: '',
  website: 'www.MsKnope.com',
  education: [
    {
      title: 'A Environmental and Public Affairs',
      location: 'Indiana University, Bloomington, Indiana',
      from: new Date(1993, 9, 1),
      to: new Date(1993, 4, 1),
      current: false,
      summary: '<p>Summa cum Laude</p>',
    },
  ],
  work: [
    {
      title: 'Deputy Director Parks Department',
      location: 'City of Pawnee, Indiana',
      from: new Date(2009, 1, 1),
      to: new Date(2012, 1, 1),
      current: true,
      summary:
        '<ul><li><p>In placerat nisi pellentesque felis blandit, vel varius justo eleifend.</p></li><li><p>Etiam porttitor tortor vel lobortis ultricies.</p></li><li><p>Nam non libero accumsan, sagittis nibh vitae, auctor ligula.</p></li><li><p>Sed hendrerit dui a ante porttitor, vitae tristique ipsum laoreet.</p></li><li><p>Suspendisse interdum mauris a lectus dignissim, vitae aliquet ante tempor.</p></li></ul>',
    },
    {
      title: 'City Councilor',
      location: 'City of Pawnee, Indiana',
      from: new Date(2012, 1, 1),
      to: new Date(),
      current: true,
      summary:
        '<ul><li><p>Sed ut lorem viverra urna malesuada interdum in ut risus.</p></li><li><p>Duis at sem non justo aliquam iaculis.</p></li><li><p>Quisque lobortis nibh non turpis interdum ornare.</p></li><li><p>Sed et diam nec arcu tempor suscipit sit amet at tellus.</p></li><li><p>Duis quis diam imperdiet, pharetra lacus eget, fringilla odio.</p></li></ul>',
    },
  ],
  projects: [
    {
      title: 'Lot 48',
      location: 'City of Pawnee, Indiana',
      from: new Date(2009, 1, 1),
      to: new Date(2012, 1, 1),
      current: true,
      summary:
        '<ul><li><p>Sed ut lorem viverra urna malesuada interdum in ut risus.</p></li><li><p>Duis at sem non justo aliquam iaculis.</p></li><li><p>Quisque lobortis nibh non turpis interdum ornare.</p></li><li><p>Sed et diam nec arcu tempor suscipit sit amet at tellus.</p></li><li><p>Duis quis diam imperdiet, pharetra lacus eget, fringilla odio.</p></li></ul>',
    },
  ],
  displayEducation: true,
  displayProjects: false,
  activeColor: '#5B21B6',
};

export const cvSettingsEmptyTemplate: Cv = {
  jobTitle: '',
  name: '',
  lastName: '',
  email: '',
  location: '',
  phoneNumber: '',
  aboutme: '',
  jobSkills: [],
  softSkills: [],
  languages: [],
  linkedin: '',
  twitter: '',
  github: '',
  website: '',
  education: [],
  work: [],
  projects: [],
  displayEducation: true,
  displayProjects: false,
  activeColor: '#5B21B6',
};
