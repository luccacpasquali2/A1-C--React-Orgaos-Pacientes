using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using projeto.Models;
using projeto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

// Jose Adonai e Alice Gabriele

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>(options => options.UseSqlite("Data Source=projeto_projeto.db"));
builder.Services.AddCors(options => {
    options.AddPolicy("AcessoTotal",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.MapGet("/", () => "Api Orgãos");

// Cadastrar o paciente
app.MapPost("/api/paciente/cadastrar", async ([FromBody] Paciente paciente, [FromServices] AppDataContext ctx) =>
{
    // Vai verificar se o paciente já existe
    var existingPaciente = await ctx.Pacientes.FirstOrDefaultAsync(p => p.Nome == paciente.Nome && p.CPF == paciente.CPF);
    if (existingPaciente != null)
    {
        return Results.Ok("Paciente já cadastrado");
    }
    else
    {
        ctx.Pacientes.Add(paciente);
        await ctx.SaveChangesAsync();
    }

    return Results.Created($"/api/paciente/{paciente.Id}", paciente);
});

// Listar todos os pacientes
app.MapGet("/api/paciente/listar", async ([FromServices] AppDataContext ctx) =>
{
    var pacientes = await ctx.Pacientes.ToListAsync();
    return Results.Ok(pacientes);
});

// Alterar o cadastro de paciente
app.MapPut("/api/paciente/alterar/{id}", async (HttpContext context, int id, [FromBody] Paciente paciente, [FromServices] AppDataContext ctx) =>
{
    var existingPaciente = await ctx.Pacientes.FindAsync(id);
    if (existingPaciente == null)
    {
        return Results.NotFound($"{id} não foi encontrado.");
    }

    existingPaciente.Nome = paciente.Nome;
    existingPaciente.CPF = paciente.CPF;
    existingPaciente.Orgao = paciente.Orgao;
    existingPaciente.TipoSanguineo = paciente.TipoSanguineo;

    await ctx.SaveChangesAsync();

    return Results.Ok(existingPaciente);
});

// Remover o cadastro de paciente
app.MapDelete("/api/paciente/remover/{id}", async (int id, [FromServices] AppDataContext ctx) =>
{
    var paciente = await ctx.Pacientes.FindAsync(id);
    if (paciente == null)
    {
        return Results.NotFound($"{id} não foi encontrado.");
    }

    ctx.Pacientes.Remove(paciente);
    await ctx.SaveChangesAsync();

    return Results.NoContent();
});

// Órgãos

// Cadastrar o órgão
app.MapPost("/api/orgao/cadastrar", async ([FromBody] Orgao orgao, [FromServices] AppDataContext ctx) =>
{
    ctx.Orgaos.Add(orgao);
    await ctx.SaveChangesAsync();

    // Faz a verificação se existe paciente que precise deste órgão
    var pacientesQuePrecisam = await ctx.Pacientes.Where(p => p.Orgao == orgao.Nome).ToListAsync();
    if (pacientesQuePrecisam.Any())
    {
        return Results.Ok("Aviso: Existem pacientes na espera deste órgão");
    }

    // Se não tiver, ele só salva
    return Results.Created($"/api/orgao/{orgao.Id}", orgao);
});

// Listar os órgãos
app.MapGet("/api/orgao/listar", async ([FromServices] AppDataContext ctx) =>
{
    var orgaos = await ctx.Orgaos.ToListAsync();
    return Results.Ok(orgaos);
});

// Alterar cadastro de órgão
app.MapPut("/api/orgao/alterar/{id}", async (int id, [FromBody] Orgao orgao, [FromServices] AppDataContext ctx) =>
{
    var existingOrgao = await ctx.Orgaos.FindAsync(id);
    if (existingOrgao == null)
    {
        return Results.NotFound($"{id} não foi encontrado.");
    }
    existingOrgao.Nome = orgao.Nome;
    existingOrgao.DataRecebimento = orgao.DataRecebimento;
    existingOrgao.TipoSanguineo = orgao.TipoSanguineo;

    await ctx.SaveChangesAsync();

    return Results.Ok(existingOrgao);
});

// Remover cadastro de órgão
app.MapDelete("/api/orgao/remover/{id}", async (int id, [FromServices] AppDataContext ctx) =>
{
    var orgao = await ctx.Orgaos.FindAsync(id);
    if (orgao == null)
    {
        return Results.NotFound($"{id} não foi encontrado.");
    }

    ctx.Orgaos.Remove(orgao);
    await ctx.SaveChangesAsync();

    return Results.NoContent();
});

app.UseCors("AcessoTotal");

app.Run();
