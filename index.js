const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const dbProject = require('./data/helpers/projectModel')
const dbAction = require('./data/helpers/actionModel')


const server = express();
const PORT  = 5050;

server.use(
    express.json(),
    logger('tiny'),
    helmet()
);


//Getting the projects
server.get('/api/projects', (req, res) => {
    dbProject.get()
    .then(projects=>{
        res.status(200).json(projects);
    })		
    .catch(err => {
        res
            .status(500)
            .json({ error: 'The projects information could not be retrieved.' });
    });
})

//Getting the project with ID
server.get('/api/projects/:id', (req, res) =>{
    let id=req.params.id;
    dbProject.get(id)
    .then(project=>{
        res.status(200).json(project)
    }).catch(err=>{res.status(500).json({error:'The project info is not found'})})
})

//Creating a project
server.post('/api/projects', (req, res)=>{
    let newproj=req.body;

    if(newproj.name,newproj.description){

        if(newproj.name.length<=128){
    dbProject.insert(newproj)
    .then(
        project=>{
            res.status(200).json(project);
        }
    ).catch(err=>{res.status(500).json({error:"could not save project"})})

}else{res.status(500).json({error:"name must be less than 128 characters!"})}
}
    else{
        res.status(400).json({error:"please provide name and description"})
    }
})


//Update project with ID
server.put('/api/projects/:id', (req,res)=>{
    let id=req.params.id;
    let changes=req.body;
    console.log(`id ${id}, changes ${changes}`);
    dbProject.update(id,changes)
    .then(updateProject=>{
        if(updateProject){
        res.status(200).json({updateProject})}
        else{res.status(404).json({error:"user with that id could not be updated"})
        }
    }

    )
})

//Delete project with ID
server.delete('/api/projects/:id',(req,res)=>{
    let id=req.params.id;
    dbProject.remove(id).then(deletedID=>{
        if(deletedID){
        res.status(200).json({success:'successfully removed'})}else{
            res.status(500).json({error:"user cannot be removed"})
        }
    })

})


//Getting the actions
server.get('/api/actions', (req, res) => {
    dbAction.get()
    .then(actions=>{
        res.status(200).json(actions);
    })		
    .catch(err => {
        res
            .status(500)
            .json({ error: 'The actions information could not be retrieved.' });
    });
})

//Adding new action
server.post('/api/actions', (req, res)=>{
    let newaction=req.body;

    if(newaction.project_id,newaction.description,newaction.notes){

        if(newaction.description.length<=128){
    dbAction.insert(newaction)
    .then(
        action=>{
            console.log("action"+action)
            res.status(200).json(action);
        }
    ).catch(err=>{res.status(500).json({error:"could not save project"})})

}else{res.status(500).json({error:"description must be less than 128 characters!"})}
}
    else{
        res.status(400).json({error:"please provide project id, notes and description"})
    }
})

//Updating the action
server.put('/api/actions/:id', (req,res)=>{
    let id=req.params.id;
    let changes=req.body;
    dbAction.update(id,changes)
    .then(updatedAction=>{
        if(updatedAction){
        res.status(200).json({updatedAction})}
        else{res.status(404).json({error:"action with that id could not be updated"})
        }
    }

    )
})

//Delete the action
server.delete('/api/actions/:id',(req,res)=>{
    let id=req.params.id;
    dbProject.remove(id).then(numberDeleted=>{
        if(numberDeleted){
        res.status(200).json({success:'successfully removed'})}else{
            res.status(500).json({error:"user cannot be removed"})
        }
    })

})
server.listen(PORT, err=>{
    console.log(`PORT ${PORT}`)
})   