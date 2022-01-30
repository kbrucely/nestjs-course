import { Test } from '@nestjs/testing';
import { TasksRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
});
const mockUser = {
    username: 'kevin',
    id: 'someId',
    password: 'somePassword',
    tasks: [],
}

describe ('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository },
            ],
        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });

    describe('Get Tasks', () => {
        it('calls TaskRepository.getTasks and returns results', () => {
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = tasksService.getTasks(null, mockUser);
            expect(result).toEqual('someValue');
        });
    });
});