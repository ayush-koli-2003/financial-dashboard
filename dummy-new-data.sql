select * from db_fd_user;

select * from db_fd_budgets;

INSERT INTO db_fd_budgets (category, amount, date, userId) VALUES 
('HOUSING', 15000, '2024-11-01', 17), ('FOOD', 8000, '2024-11-01', 17), 
('TRANSPORTATION', 3000, '2024-11-01', 17), ('HOUSING', 15000, '2024-12-01', 17), 
('FOOD', 8000, '2024-12-01', 17), ('TRANSPORTATION', 3000, '2024-12-01', 17), 
('HOUSING', 15000, '2025-01-01', 17), ('FOOD', 8500, '2025-01-01', 17), 
('TRANSPORTATION', 3200, '2025-01-01', 17), ('HOUSING', 15000, '2025-02-01', 17), 
('FOOD', 8500, '2025-02-01', 17), ('TRANSPORTATION', 3200, '2025-02-01', 17), 
('HOUSING', 16000, '2025-03-01', 17), ('FOOD', 9000, '2025-03-01', 17), 
('TRANSPORTATION', 4000, '2025-03-01', 17), ('HOUSING', 16000, '2025-04-01', 17), 
('FOOD', 9000, '2025-04-01', 17), ('TRANSPORTATION', 4000, '2025-04-01', 17);

INSERT INTO db_fd_budgets values ('Food', 9000, '2025-03-01', 17);

INSERT INTO db_fd_income (amount, category, note, date, userId) VALUES (65000, 'SALARY', 'Monthly salary', '2024-11-05', 17), (65000, 'SALARY', 'Monthly salary', '2024-12-05', 17), (68000, 'SALARY', 'Monthly salary with increment', '2025-01-05', 17), (68000, 'SALARY', 'Monthly salary', '2025-02-05', 17), (68000, 'SALARY', 'Monthly salary', '2025-03-05', 17), (70000, 'SALARY', 'Monthly salary with bonus', '2025-04-05', 17), (8000, 'INVESTMENTS', 'Dividend income', '2024-12-15', 17), (12000, 'INVESTMENTS', 'Stock sale profit', '2025-03-20', 17);

INSERT INTO db_fd_investment (name, note, category, amount, returns, date, userId, budgetId) VALUES ('HDFC Equity Fund', 'Monthly SIP', 'Stocks', 5000, NULL, '2024-11-15', 17, NULL), ('HDFC Equity Fund', 'Monthly SIP', 'Stocks', 5000, NULL, '2024-12-15', 17, NULL), ('HDFC Equity Fund', 'Monthly SIP', 'Stocks', 5000, NULL, '2025-01-15', 17, NULL), ('HDFC Equity Fund', 'Monthly SIP', 'Stocks', 5000, NULL, '2025-02-15', 17, NULL), ('HDFC Equity Fund', 'Monthly SIP', 'Stocks', 5000, NULL, '2025-03-15', 17, NULL), ('HDFC Equity Fund', 'Monthly SIP', 'Stocks', 5000, NULL, '2025-04-15', 17, NULL), ('Reliance shares', 'Long term investment', 'STOCKS', 25000, 2500, '2025-01-05', 17, NULL), ('Gold ETF', 'Gold investment', 'Other Investments', 10000, NULL, '2025-03-10', 17, NULL);

INSERT INTO db_fd_expense (name, amount, category, note, date, userId, budgetId) VALUES ('House Rent', 12000, 'HOUSING', 'Monthly rent', '2024-11-05', 17, NULL), ('Groceries', 5000, 'FOOD', 'Monthly groceries from DMart', '2024-11-10', 17, NULL), ('Petrol', 2000, 'TRANSPORTATION', 'Bike fuel', '2024-11-15', 17, NULL), ('House Rent', 12000, 'HOUSING', 'Monthly rent', '2024-12-05', 17, NULL), ('Groceries', 5500, 'FOOD', 'Monthly groceries', '2024-12-12', 17, NULL), ('Petrol', 2200, 'TRANSPORTATION', 'Bike fuel', '2024-12-18', 17, NULL), ('House Rent', 12000, 'HOUSING', 'Monthly rent', '2025-01-05', 17, NULL), ('Groceries', 6000, 'FOOD', 'Monthly groceries', '2025-01-10', 17, NULL), ('Petrol', 2500, 'TRANSPORTATION', 'Bike fuel', '2025-01-15', 17, NULL), ('Electricity Bill', 2000, 'HOUSING', 'Bi-monthly bill', '2025-01-20', 17, NULL), ('House Rent', 12000, 'HOUSING', 'Monthly rent', '2025-02-05', 17, NULL), ('Groceries', 5800, 'FOOD', 'Monthly groceries', '2025-02-12', 17, NULL), ('Petrol', 2800, 'TRANSPORTATION', 'Bike fuel', '2025-02-20', 17, NULL), ('House Rent', 14000, 'HOUSING', 'Rent increased', '2025-03-05', 17, NULL), ('Groceries', 6200, 'FOOD', 'Monthly groceries', '2025-03-10', 17, NULL), ('Petrol', 3000, 'TRANSPORTATION', 'Bike fuel', '2025-03-18', 17, NULL), ('Electricity Bill', 2200, 'Housing', 'Bi-monthly bill', '2025-03-20', 17, NULL), ('House Rent', 14000, 'HOUSING', 'Monthly rent', '2025-04-05', 17, NULL), ('Groceries', 6500, 'FOOD', 'Monthly groceries', '2025-04-08', 17, NULL)