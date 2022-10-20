# import psycopg2


# def connect():
#     try:
#         print("Connecting to server ... ")
#         conn = psycopg2.connect(
#             host="34.142.195.183",
#             database="postgres",
#             user="quitnow",
#             password="bigppgang")

#         cur = conn.cursor()
#         print('PostgreSQL database version:')
#         cur.execute('SELECT version()')

#         db_version = cur.fetchone()
#         print(db_version)

#         print('INFO')
#         cur.execute('select * from users')

#         users = cur.fetchone()
#         print(users)

#         cur.close()
#     except (Exception, psycopg2.DatabaseError) as error:
#         print(error)
#     finally:
#         if conn is not None:
#             conn.close()
#             print('Database connection closed.')


# if __name__ == '__main__':
#     connect()
