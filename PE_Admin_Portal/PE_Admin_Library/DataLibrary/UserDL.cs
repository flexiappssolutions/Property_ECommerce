using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PE_Admin_Library
{
    public class UserDL
    {
        public UserDL()
        {

        }

        public static User AuthenticateUser(string username, string password)
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var users = context.Users.Where(f => f.Username == username && f.Password == password);

                    return users.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static User RetrieveUserByUsername(string username)
        {
            try
            {
                var existingUser = new User();
                using (var context = new PropertyDBEntities())
                {
                    existingUser = context.Users
                                    .Where(t => t.Username.Equals(username))
                                    .FirstOrDefault();
                }

                return existingUser;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ChangePassword(string username, string password)
        {
            try
            {
                User existingUser = new User();
                using (var context = new PropertyDBEntities())
                {
                    existingUser = context.Users
                                    .Where(t => t.Username == username)
                                    .FirstOrDefault();
                }

                if (existingUser != null)
                {
                    existingUser.Password = password;
                    existingUser.FirstTime = false;
                    using (var context = new PropertyDBEntities())
                    {
                        context.Entry(existingUser).State = EntityState.Modified;

                        context.SaveChanges();
                    }

                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
