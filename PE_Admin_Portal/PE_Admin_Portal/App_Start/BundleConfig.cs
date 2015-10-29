using System.Web;
using System.Web.Optimization;

namespace PE_Admin_Portal
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/AdminPortalJS/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/shared_libraries").Include(
                      "~/Scripts/AdminPortalJS/jquery.js",
                      "~/Scripts/AdminPortalJS/bootstrap.min.js",
                      "~/Scripts/AdminPortalJS/jquery-ui.min.js",
                      "~/Scripts/AdminPortalJS/moment.min.js",
                      "~/Scripts/AdminPortalJS/fullcalendar.min.js",
                      "~/Scripts/AdminPortalJS/jquery.rateit.min.js",
                      "~/Scripts/AdminPortalJS/jquery.prettyPhoto.js",
                      "~/Scripts/AdminPortalJS/jquery.slimscroll.min.js",
                      "~/Scripts/AdminPortalJS/jquery.dataTables.min.js",
                      "~/Scripts/AdminPortalJS/dataTables.tableTools.js",
                      "~/Scripts/AdminPortalJS/excanvas.min.js",
                      "~/Scripts/AdminPortalJS/jquery.flot.js",
                      "~/Scripts/AdminPortalJS/jquery.flot.resize.js",
                      "~/Scripts/AdminPortalJS/jquery.flot.pie.js",
                      "~/Scripts/AdminPortalJS/jquery.flot.stack.js",
                      "~/Scripts/AdminPortalJS/jquery.noty.js",
                      "~/Scripts/AdminPortalJS/default.js",
                      "~/Scripts/AdminPortalJS/layouts/bottomRight.js",
                      "~/Scripts/AdminPortalJS/sparklines.js",
                      "~/Scripts/AdminPortalJS/jquery.cleditor.min.js",
                      "~/Scripts/AdminPortalJS/bootstrap-datetimepicker.min.js",
                      "~/Scripts/AdminPortalJS/jquery.onoff.min.js",
                      "~/Scripts/AdminPortalJS/filter.js",
                      "~/Scripts/AdminPortalJS/custom.js",
                      "~/Scripts/AdminPortalJS/_configurationFile.js",
                      "~/Scripts/AdminPortalJS/_customValidations.js",
                      "~/Scripts/AdminPortalJS/Login/_Layout.js"));
           
            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                      "~/Scripts/AdminPortalJS/jquery.js",
                      "~/Scripts/AdminPortalJS/bootstrap.min.js",
                      "~/Scripts/AdminPortalJS/_configurationFile.js",
                      "~/Scripts/AdminPortalJS/Login/LoginIn.js",
                      "~/Scripts/AdminPortalJS/Login/ForgotPassword.js",
                      "~/Scripts/AdminPortalJS/Login/PasswordReset.js"));

            bundles.Add(new ScriptBundle("~/bundles/password").Include(
                        "~/Scripts/AdminPortalJS/Login/ChangePassword.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/upload_property").Include(
                        "~/Scripts/AdminPortalJS/Property/UploadProperty.js"));

            bundles.Add(new ScriptBundle("~/bundles/view_property").Include(
                       "~/Scripts/AdminPortalJS/Property/ViewProperty.js"));

            bundles.Add(new ScriptBundle("~/bundles/mail_template").Include(
                       "~/Scripts/AdminPortalJS/MailTemplate/MailTemplate.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/AdminPortalCSS/bootstrap.min.css",
                      "~/Content/AdminPortalCSS/font-awesome.min.css",
                      "~/Content/AdminPortalCSS/jquery-ui.css",
                      "~/Content/AdminPortalCSS/fullcalendar.css",
                      "~/Content/AdminPortalCSS/prettyPhoto.css",
                      "~/Content/AdminPortalCSS/rateit.css",
                      "~/Content/AdminPortalCSS/bootstrap-datetimepicker.min.css",
                      "~/Content/AdminPortalCSS/jquery.cleditor.css",
                       "~/Content/AdminPortalCSS/jquery.dataTables.min.css",
                      "~/Content/AdminPortalCSS/dataTables.bootstrap.min.css",
                      "~/Content/AdminPortalCSS/dataTables.tableTools.css",
                      "~/Content/AdminPortalCSS/jquery.onoff.css",
                      "~/Content/AdminPortalCSS/style.css",
                      "~/Content/AdminPortalCSS/widgets.css"));

            bundles.Add(new ScriptBundle("~/bundles/customer_portal_libraries").Include(
                     "~/Scripts/CustomerPortalJS/jquery.js",                     
                     "~/Scripts/CustomerPortalJS/bootstrap.min.js",
                     "~/Scripts/CustomerPortalJS/jquery.placeholder.js",
                     "~/Scripts/CustomerPortalJS/custom.js",
                     "~/Scripts/AdminPortalJS/_configurationFile.js"));

            bundles.Add(new ScriptBundle("~/bundles/customer_portal_home").Include(
                   "~/Scripts/CustomerPortalJS/library.property.js"));

            bundles.Add(new ScriptBundle("~/bundles/customer_portal_property").Include(
                   "~/Scripts/CustomerPortalJS/property.list.js"));

            bundles.Add(new StyleBundle("~/Content/customer_portal_css").Include(
                     "~/Content/CustomerPortalCSS/bootstrap.css",
                     "~/Content/CustomerPortalCSS/bootstrap-responsive.css",
                     "~/Content/CustomerPortalCSS/font-awesome.min.css",
                     "~/Content/CustomerPortalCSS/colors.css",
                     "~/Content/CustomerPortalCSS/style.css",
                      "~/Content/CustomerPortalCSS/Wobblebar.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
