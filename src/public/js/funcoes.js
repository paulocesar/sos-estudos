// Validação Trabalhe Conosco
function validarTrabalhe(){
var d=document.Trabalhe;
	if ((d.nome.value=="") || (d.nome.value=="Nome")){
		alert('Por favor, digite seu nome.');
		d.nome.focus();
		return false;
		stop;
	}
	
	if ((d.cpf.value=="") || (d.cpf.value=="CPF")){
		alert('Por favor, informe seu CPF.');
		d.cpf.focus();
		return false;
		stop;
	}
	
	if ((d.estadocivil.value=="") || (d.estadocivil.value=="Estado Civil")){
		alert('Por favor, selecione o estado civil.');
		d.estadocivil.focus();
		return false;
		stop;
	}
	
	if ((d.nascimento.value=="") || (d.nascimento.value=="Data de Nascimento")){
		alert('Por favor, informe a data de nascimento.');
		d.nascimento.focus();
		return false;
		stop;
	}
	
	if ( (d.telefone.value=="") || (d.telefone.value=="Telefone")) {
		alert('Por favor, informe seu telefone.');
		d.telefone.focus();
		return false;
		stop;
	}
	
	
	if ( (d.endereco.value=="") || (d.endereco.value=="Endereço")){
		alert('Por favor, informe o seu endereço.');
		d.endereco.focus();
		return false;
		stop;
	}
	
	if ( (d.cep.value=="") || (d.cep.value=="CEP")){
		alert('Por favor, informe seu CEP.');
		d.cep.focus();
		return false;
		stop;
	}
	
	if ( (d.cidade.value=="") || (d.cidade.value=="Cidade")){
		alert('Por favor, informe a sua cidade.');
		d.cidade.focus();
		return false;
		stop;
	}
	
	if(d.uf.value=="0"){
		alert('Por favor, selecione o estado.');
		d.uf.focus();
		return false;
		stop;
	}
	
	parte1 = d.email.value.indexOf("@");
	parte2 = d.email.value.indexOf(".");
	parte3 = d.email.value.length;
	if (!(parte1 >= 3 && parte2 != -1 && parte3 >= 9) || d.email.value=="") {
		alert('Informe seu e-mail corretamente.');
		d.email.focus();
		return false;
		stop;
	}
	
	if(d.escolaridade.value=="0"){
		alert('Por favor, selecione a escolaridade.');
		d.escolaridade.focus();
		return false;
		stop;
	}
}

// Validação Contato
// onSubmit="return validarContato();"
function validarContato(){
var d=document.contato;
	if ( (d.nome.value=="") || (d.nome.value=="Nome")) {
		alert('Por favor, digite seu nome.');
		d.nome.focus();
		return false;
		stop;
	}
	parte1 = d.email.value.indexOf("@");
	parte2 = d.email.value.indexOf(".");
	parte3 = d.email.value.length;
	if (!(parte1 >= 3 && parte2 != -1 && parte3 >= 9) || d.email.value=="") {
		alert('Informe seu e-mail corretamente.');
		d.email.focus();
		return false;
		stop;
	}
	if ( (d.telefone.value=="") || (d.telefone.value=="Telefone")) {
		alert('Por favor, informe seu telefone.');
		d.telefone.focus();
		return false;
		stop;
	}
	if ( (d.cidade.value=="") || (d.cidade.value=="Cidade")) {
		alert('Por favor, informe sua cidade.');
		d.cidade.focus();
		return false;
		stop;
	}
	if(d.uf.value=="0"){
		alert('Por favor, selecione seu estado.');
		d.uf.focus();
		return false;
		stop;
	}

	if ( (d.mensagem.value=="") || (d.mensagem.value=="Mensagem")) {
		alert('Por favor, informe o motivo do contato.');
		d.mensagem.focus();
		return false;
		stop;
	}
}

// SCRIPT BLUR E FOCUS + MASCARA DE TELEFONE
$(document).ready(function(){        
   $("input[type=text]").focus(function(){              

        var id = $(this).attr("id");

        if(id == "tel" || id == "cel"){
            var valor = $(this).val();
            
            $(this).mask("(99) 9999-9999?9");

            $(this).blur(function(){
                var phone, element;
                element = $(this); 
                element.unmask(); 
                phone = element.val().replace(/\D/g, ''); 
                if (phone.length > 10) { 
                element.mask("(99) 99999-999?9"); 
                } else { 
                element.mask("(99) 9999-9999?9"); 
                }                      

                if($(this).val() == ""){                   

                $(this).val(valor);

                }

            });
            
            }if(id == "cpf"){
            var valor = $(this).val();
            
            $(this).mask("999.999.999-99");

            $(this).blur(function(){                                  

                if($(this).val() == ""){                   

                $(this).val(valor);

                }

            });
            
            }if(id == "cep"){
            var valor = $(this).val();
            
            $(this).mask("99999-999");

            $(this).blur(function(){                                  

                if($(this).val() == ""){                   

                $(this).val(valor);

                }

            });

        }if(id == "datadenascimento"){
            var valor = $(this).val();
            
            $(this).mask("99/99/9999");

            $(this).blur(function(){                                  

                if($(this).val() == ""){                   

                $(this).val(valor);

                }

            });

        }else{
            var valor = $(this).val();

            $(this).val("");

            $(this).blur(function(){                    

                if($(this).val() == ""){                   

                $(this).val(valor);

                }

            });
        }           
    });

    $("textarea").focus(function(){
        valor = $(this).val();

        $(this).val("");

            $(this).blur(function(){                    

                if($(this).val() == ""){                   

                $(this).val(valor);

                }

            });
   });
});  