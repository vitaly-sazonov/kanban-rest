import { Board, Task } from './interfaces';

const taskArray: Task[] = [
  {
    title: 'Task: pet the cat',
    description: 'Domestic cat needs to be stroked gently',
  },
  {
    title: 'Task: pet the cat',
    description: 'Domestic cat needs to be stroked gently',
  },
  {
    title: 'Task: pet the cat',
    description: 'Domestic cat needs to be stroked gently',
  },
  {
    title: 'Task: pet the cat',
    description: 'Domestic cat needs to be stroked gently',
  },
];

export const CUSTOM_BOARDS: Board[] = [
  {
    id: '1',
    title: 'Kanban template',
    description:
      'Use this simple Kanban template to keep the engineering team on the same page and moving through work fluidly.',
    columns: [
      {
        title: 'Backlog',
        order: 1,
        tasks: taskArray,
      },
      {
        title: 'Design',
        order: 2,
        tasks: [],
      },
      {
        title: 'To Do',
        order: 3,
        tasks: [],
      },
      {
        title: 'Doing',
        order: 4,
        tasks: [],
      },
      {
        title: 'Code review',
        order: 5,
        tasks: [],
      },
      {
        title: 'Testing',
        order: 6,
        tasks: [],
      },
      {
        title: 'Done',
        order: 7,
        tasks: taskArray,
      },
    ],
  },
  {
    id: '2',
    title: 'Kanban template',
    description:
      'Use this simple Kanban template to keep the engineering team on the same page and moving through work fluidly.',
    columns: [
      {
        title: 'Backlog',
        order: 1,
        tasks: [],
      },
      {
        title: 'Design',
        order: 2,
        tasks: [],
      },
      {
        title: 'To Do',
        order: 3,
        tasks: [],
      },
      {
        title: 'Doing',
        order: 4,
        tasks: [],
      },
      {
        title: 'Code review',
        order: 5,
        tasks: [],
      },
      {
        title: 'Testing',
        order: 6,
        tasks: [],
      },
      {
        title: 'Done',
        order: 7,
        tasks: [],
      },
    ],
  },
];
