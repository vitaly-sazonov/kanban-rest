import { Board, Task } from './interfaces';

const taskArray: Task[] = [
  {
    title: 'Task 1: pet the cat',
    description: 'Domestic cat needs to be stroked gently',
  },
  {
    title: 'Task 2',
    description: 'This is second task',
  },
  {
    title: 'Task 3',
    description: 'This is third task',
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
    title: 'Lean Canvas',
    description:
      'Lean Canvas is a 1-page business plan template created by Ash Maurya that helps you deconstruct your idea into its key assumptions.',
    columns: [
      {
        title: 'Problem',
        order: 1,
        tasks: [
          {
            title: 'What top 3 problems do you face ?',
            description: 'Top 3 problems you face',
          },
        ],
      },
      {
        title: 'Customer Segments',
        order: 2,
        tasks: [
          {
            title: 'For whom are we creating value?',
            description:
              'For whom are we creating value?\n Who are our most important customers?\nTarget customer?',
          },
        ],
      },
      {
        title: 'Unique Value Propositions',
        order: 3,
        tasks: [],
      },
      {
        title: 'Solution',
        order: 4,
        tasks: [],
      },
      {
        title: 'Unfair Advantage',
        order: 5,
        tasks: [],
      },
      {
        title: 'Revenue Streams',
        order: 6,
        tasks: [],
      },
      {
        title: 'Cost Structure',
        order: 7,
        tasks: [],
      },
      {
        title: 'Key Metrics',
        order: 7,
        tasks: [],
      },
      {
        title: 'Channels',
        order: 7,
        tasks: [],
      },
    ],
  },
];
