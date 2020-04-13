using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Zaginiony24.Models;

namespace Zaginiony24.Infrastructure
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                if (!context.Users.Any())
                {
                    var users = new List<AppUser>()
                    {
                        new AppUser
                        {

                            Email = "admin@zaginiony24.pl",
                            EmailConfirmed = true,
                            PhoneNumber = "602212512",
                            UserName = "admin",
                            Name = "Bartek",
                            Surname = "Losowy",
                            DateJoined = DateTime.Now
                        },
                        new AppUser
                        {

                            Email = "user@zaginiony24.pl",
                            EmailConfirmed = true,
                            PhoneNumber = "632398126",
                            UserName = "user",
                            Name = "Robert",
                            Surname = "Smolinski",
                            DateJoined = DateTime.Now
                        }

                    };
                    foreach (var user in users)
                    {
                        var result = userManager.CreateAsync(user, "Passw0rd").Result;
                        if (!result.Succeeded)
                        {
                            throw new Exception(result.Errors.First().Description);
                        }
                        
                    }
                    context.SaveChanges();
                }

                if (!context.Notices.Any())
                {
                    context.Notices.AddRange(
                        new Notice
                        {
                            Name = "Maciej",
                            Surname = "Konradowski",
                            City = "Lublin",
                            District = "lubelskie",
                            DateOfDisappearance = new DateTime(2020, 03, 04),
                            LastSeenPlace = "Lublin",
                            Height = 193,
                            Age = 32,
                            EyeColor = "Piwne",
                            SpecialCharacters = null,
                            Description = "w dniu zaginięcia miał duży zarost. Ubrany był w czarne dresy i bluzkę z napisem. Na sobie miał brązową kurtkę i wiązane buty tego samego koloru.",
                            DatePosted = DateTime.Now,
                            User = userManager.FindByNameAsync("user").Result
                        },
                        new Notice
                        {
                            Name = "Justyna",
                            Surname = "Kowalska",
                            City = "Warszawa",
                            District = "mazowieckie",
                            DateOfDisappearance = new DateTime(2020, 01, 22),
                            LastSeenPlace = "Warszawa",
                            Height = 175,
                            Age = 23,
                            EyeColor = "Niebieskie",
                            SpecialCharacters = null,
                            Description = "23-latka wyszła ze swojego miejsca zamieszkania w Warszawie i dotąd nie wróciła. Nie nawiązała też kontaktu z rodziną. Policja opublikowała na swojej stronie internetowej zdjęcie zaginionej.",
                            DatePosted = DateTime.Now,
                            User = userManager.FindByNameAsync("user").Result
                        });
                    context.SaveChanges();
                }
            }
        }
    }
}
