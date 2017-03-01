using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Onboarding.Startup))]
namespace Onboarding
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
