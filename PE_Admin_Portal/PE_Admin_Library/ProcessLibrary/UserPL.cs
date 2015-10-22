using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PE_Admin_Library
{
    public class UserPL
    {
        public UserPL()
        {

        }

        public static User AuthenticateUser(string username, string password)
        {
            try
            {
                return UserDL.AuthenticateUser(username, password);                
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
                return UserDL.RetrieveUserByUsername(username);
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
                return UserDL.ChangePassword(username, password);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
