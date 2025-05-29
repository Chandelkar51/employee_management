// express, mongoose

import Express from "express"
import cors from "cors"
import authRouter from './routes/auth.routes.js'
import dbConnection from './db/db.js'
import departmentRouter from './routes/department.routes.js'
import employeeRouter from './routes/employee.routes.js'
import salaryRouter from './routes/salary.routes.js'
import leaveRouter from './routes/leave.routes.js'
import settingRouter from './routes/setting.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'

const app=Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(process.env.PORT, ()=>{
    dbConnection();
    console.log("Server running at Port 3000");
});
