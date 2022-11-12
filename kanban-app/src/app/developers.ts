export interface DEVELOPER {
  id: number;
  firstName: string;
  secondName: string;
  photoURL: string;
  git: string;
  features: string[];
  aboutAuthor: string;
  alt: string;
}
export const DEVELOPERS: DEVELOPER[] = [
  {
    id: 2,
    firstName: 'Alexander',
    secondName: 'Malchevsky',
    photoURL: 'https://avatars.githubusercontent.com/u/91604689?v=4',
    git: 'https://github.com/malickalex1975',
    features: [],
    alt: '',
    aboutAuthor:
      "Hello! A little about myself, I have three passions: traveling, cars and programming. The third passion is the strongest. I love coding, and no matter what project it is, the final task for Angular or some ordinary one, no matter what language it is, Java Script or Python, I just love it and give it my all.",
  },
  {
    id: 3,
    firstName: 'Ivan',
    secondName: 'Makarishchev',
    photoURL: 'https://ivanmakarishchev.github.io/rsschool-cv/images/photo.jpg',
    git: 'https://github.com/IvanMakarishchev',
    features: ['Design'],
    alt: '',
    aboutAuthor:
      "Hello world! My name is Ivan Makarishchev and I'm studying on Stage#2 JavaScript Front-End Course of Rolling Scopes school. This is our course project. I hope you'll like it!",
  },
  {
    id: 0,
    firstName: 'Yauheni',
    secondName: 'Tsurankou',
    photoURL: 'https://avatars.githubusercontent.com/u/41520794?v=4',
    git: 'https://github.com/teleuzi',
    features: ['Mentoring'],
    alt: '',
    aboutAuthor:
      "Hi! My name is Yauheni and I'm mentor of this brilliant hardworking team.",
  },
  {
    id: 1,
    firstName: 'Alex',
    secondName: 'Kochnev',
    photoURL: 'https://avatars.githubusercontent.com/u/92919510?v=4',
    git: 'https://github.com/alexkochnev1987',
    features: ['Team Lead', 'Authorization', 'Welcome Page'],
    alt: '',
    aboutAuthor:
      'Hello world! My name is Alex Kochnev and this is our course project. Sport taught me how to face challenges, achieve results and work as an effective part of the team. My goal is to become a valuable member of the Development team in the real life project.',
  },
];
