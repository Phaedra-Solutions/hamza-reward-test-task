import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000);

  it('/user (POST)', async () => {
    const data = await request(app.getHttpServer()).post('/user').send({
      name: 'John Doe',
    });
    userId = data.body.id;
    expect(data.body).toHaveProperty('id');
  });

  it('/user (GET)', async () => {
    const data = await request(app.getHttpServer()).get('/user').expect(200);
    expect(data.body).not.toBe(null);
  });

  it('/user/stats-monthly (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/user/stats-monthly')
      .expect(200);
    expect(data.body).not.toBe(null);
  });

  it('/user/stats (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/user/stats')
      .expect(200);
    expect(data.body).not.toBe(null);
  });

  it(`/user (GET)`, async () => {
    const data = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200);
    expect(data.body).toHaveProperty('id');
  });

  it('/user/:id (PATCH)', async () => {
    const data = await request(app.getHttpServer())
      .patch(`/user/${userId}`)
      .send({
        name: 'John Did',
      })
      .expect(200);
    expect(data.body).toHaveProperty('id');
  });

  it('/user/:id (DELETE)', async () => {
    await request(app.getHttpServer()).delete(`/user/${userId}`).expect(200);
  });

  it('/user/month-stats (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/user/stats-monthly')
      .expect(200);
    expect(data.body).not.toBe(null);
  });

  it('/user/stats (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/user/stats')
      .expect(200);
    expect(data.body).not.toBe(null);
  });
});

describe('TransactionController (e2e)', () => {
  let app: INestApplication;
  let userId: string;
  let transactionId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000);

  describe('', () => {
    beforeEach(async () => {
      const data = await request(app.getHttpServer()).post('/user').send({
        name: 'John Doe',
      });
      userId = data.body.user_id;
      transactionId = data.body.id;
    });
    it('/transaction (POST)', async () => {
      const data = await request(app.getHttpServer())
        .post('/transaction')
        .send({
          user_id: userId,
          amount: 100,
        });
      expect(data.body).toHaveProperty('id');
    });
  });

  it('/transaction (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/transaction')
      .expect(200);
    expect(data.body).not.toBe(null);
  });

  it('/transaction/:id (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get(`/transaction/${transactionId}`)
      .expect(200);
    expect(data.body).not.toBe(null);
  });

  it('/transaction/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/transaction/${transactionId}`)
      .expect(200);
  });
});
