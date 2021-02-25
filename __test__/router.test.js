'use strict';
require('dotenv').config();
const {server} = require( '../src/server.js' );
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose( server );
const articleModel = require( '../src/model/articleModel.js' );
const projectModel = require( '../src/model/projectModel.js' );
const testingURL = process.env.TESTING_URL;
console.log = jest.fn();


describe ('routes tests', ()=>{

  const articleData = {
    author: 'testing author',
    title: 'testing title',
    sub_title: 'testing sub title',
    body: 'testing body string',
  };

  const projectData = {
    title: 'testing project',
    sub_title: 'testing sub title',
    description: 'testing description',
    summary: 'testing summary',
    title_img: 'testing.url.com',
  };


  let newArticle, newProject;

  beforeEach (async(done)=>{
    newArticle = await new articleModel(articleData).save();
    newProject = await new projectModel(projectData).save();
    done();
  });
  
  afterEach(async(done)=>{
    await articleModel.deleteMany({});
    await projectModel.deleteMany({});
    done();
  });

  it('testing to create a new data,', async ()=>{

    const article = await mockRequest.post(`${testingURL}/articles`).send(articleData);
    Object.keys(articleData).forEach(record => {
      expect (articleData[record]).toBe(article.body[record]); 
    });
    
    const project = await mockRequest.post(`${testingURL}/projects`).send(projectData);
    Object.keys(projectData).forEach(record => {
      expect (projectData[record]).toBe(project.body[record]); 
    });

  });

  it('testing to 500 error handlelr when create a new log,', async ()=>{
    const badArticleData = {
      sub_title: 'testing sub title',
      body: 'testing body string',
    };
  
    const badProjectData = {
      sub_title: 'testing sub title',
      description: 'testing description',
      summary: 'testing summary',
      title_img: 'testing.url.com',
    };
    const article = await mockRequest.post(`${testingURL}/articles`).send(badArticleData);
    expect (article.status).toBe(500);

    const project = await mockRequest.post(`${testingURL}/projects`).send(badProjectData);
    expect (project.status).toBe(500);
  });


  it('testing to get all logs,', async ()=>{

    const articles = await mockRequest.get(`${testingURL}/articles`);
    expect (articles.body.length).toBeGreaterThan(0);
    
    const projects = await mockRequest.get(`${testingURL}/projects`);
    expect (projects.body.length).toBeGreaterThan(0);
  });


  it('testing to get one log,', async ()=>{

    const articleID = newArticle._id;
    const article = await mockRequest.get(`${testingURL}/articles/${articleID}`);
    Object.keys(articleData).forEach(record =>{
      expect(articleData[record]).toBe(article.body[record]);
    });

    const projectID = newProject._id;
    const project = await mockRequest.get(`${testingURL}/projects/${projectID}`);
    Object.keys(projectData).forEach(record =>{
      expect(projectData[record]).toBe(project.body[record]);
    });
  });



  it('testing to delete one record,', async ()=>{

    const articleID = newArticle._id;
    const article = await mockRequest.delete(`${testingURL}/articles/${articleID}`);
    expect (article.status).toBe(200);

    const projectID = newProject._id;
    const project = await mockRequest.delete(`${testingURL}/projects/${projectID}`);
    expect (project.status).toBe(200);
  });


  it('testing to update one record,', async ()=>{

    const articleID = newArticle._id;
    const newArticleData = {
      ...articleData,
      author: 'another author',
    };
    const reqArticleUpdate = await mockRequest.patch(`${testingURL}/articles/${articleID}`).send(newArticleData);
    expect (reqArticleUpdate.status).toBe(200);

    const updatedArticle = await mockRequest.get(`${testingURL}/articles/${articleID}`);
    Object.keys(newArticleData).forEach(record => {
      expect(newArticleData[record]).toBe(updatedArticle.body[record]);
    });


    const projectID = newProject._id;
    const newProjectData = {
      ...projectData,
      title: 'another title',
    };
    const reqProjectUpdate = await mockRequest.patch(`${testingURL}/projects/${projectID}`).send(newProjectData);
    expect (reqProjectUpdate.status).toBe(200);

    const updatedProject = await mockRequest.get(`${testingURL}/projects/${projectID}`);
    Object.keys(newProjectData).forEach(record => {
      expect(newProjectData[record]).toBe(updatedProject.body[record]);
    });
  });


  it('testing to handle unknow route', async ()=>{

    const badReq = await mockRequest.get('/bad/request');
    expect(badReq.status).toBe(404);
  });

  it('testing to handle bad model path', async()=>{
    const badReq = await mockRequest.get(`${testingURL}/banModel`);
    expect(badReq.status).toBe(404);
  });

});





