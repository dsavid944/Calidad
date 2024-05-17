using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatizacionTela.Service.SingnalR
{
    public class NotificationHub:Hub
    {
        public async Task SendNotification(int data)
        {
            await Clients.All.SendAsync("SendNotification", data);
        }
    }
}
