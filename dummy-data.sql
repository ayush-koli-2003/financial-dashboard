select * from db_fd_budgets;
select * from db_fd_income;
select * from db_fd_user;
select SUM(amount) from db_fd_expense where userId = 4 group by MONTH(date);
select * from db_fd_expense where userId = 4 order by date;
select * from db_fd_investment;

delete from db_fd_expense where id = 59;

--insert into db_fd_income values('Other',4,'2025-03-01',1500,null);
insert into db_fd_expense values('Transportation','2025-02-13',4,'Bus',120,null);
insert into db_fd_expense values('Transportation','2025-02-16',4,'Bus',100,null);
insert into db_fd_expense values('Transportation','2025-02-10',4,'Bus',80,null);
insert into db_fd_expense values('Electronics','2025-02-09',4,'Mobile',21000,null);
insert into db_fd_expense values('Electronics','2025-02-06',4,'Cable',200,'Repair cable');
insert into db_fd_expense values('Food','2025-02-11',4,'Lunch',150,'Mess');
insert into db_fd_expense values('Food','2025-02-10',4,'Dinner',150,'Mess');
insert into db_fd_expense values('Food','2025-02-13',4,'Breakfast',50,'Mess');
insert into db_fd_expense values('Food','2025-02-14',4,'Lunch',150,'Mess');
insert into db_fd_expense values('Food','2025-02-18',4,'Dinner',200,'Mess');

insert into db_fd_expense values('Transportation','2025-03-13',4,'Bus',50,null);
insert into db_fd_expense values('Transportation','2025-03-16',4,'Bus',80,null);
insert into db_fd_expense values('Transportation','2025-03-10',4,'Bus',110,null);
insert into db_fd_expense values('Electronics','2025-03-09',4,'New cooler',10000,null);
insert into db_fd_expense values('Electronics','2025-03-06',4,'Fridge',1000,'Repair Fridge');
insert into db_fd_expense values('Food','2025-03-11',4,'Lunch',200,'Mess');
insert into db_fd_expense values('Food','2025-03-10',4,'Dinner',250,'Mess');
insert into db_fd_expense values('Food','2025-03-13',4,'Breakfast',150,'Mess');