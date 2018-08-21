using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace calhomework
{
    public partial class Form1:Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void textBox1_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar != 8 && !Char.IsDigit(e.KeyChar) && e.KeyChar !='.') 
　　        {
                e.Handled = true;
            }
        }

        private void textBox2_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar != 8 && !Char.IsDigit(e.KeyChar) && e.KeyChar !='.') 
　　        {
                e.Handled = true;
            }
        }
        public float number_1, numeber_2;
        public bool squ, rec, tri, cir;
        private void button1_Click(object sender, EventArgs e)
        {
            label1.Visible = textBox1.Visible = comboBox1.Visible = true;
            label3.Visible = textBox2.Visible = false;
            label1.Text = "请输入边长";
            squ = true;
            rec = tri = cir = false;

        }
        private void button2_Click(object sender, EventArgs e)
        {
            label1.Text = "请输入长";
            label3.Text = "请输入宽";
            label1.Visible = textBox1.Visible = comboBox1.Visible = label3.Visible = textBox2.Visible = true;
            rec = true;
            squ = tri = cir = false;
        }

       


        private void button3_Click(object sender, EventArgs e)
        {
            label1.Text = "请输入高";
            label3.Text = "请输入底";
            label1.Visible = textBox1.Visible = comboBox1.Visible = label3.Visible = textBox2.Visible = true;
            tri = true;
            squ = rec = cir = false;
        }
        private void button4_Click(object sender, EventArgs e)
        {
            label1.Text = "请输入直径";
            label1.Visible = textBox1.Visible = comboBox1.Visible = true;
            label3.Visible = textBox2.Visible = false;
            cir = true;
            squ = rec = tri = false;
        }


        public void button5_Click(object sender, EventArgs e)
        {
           
            if(squ)
            {
                if (textBox1.Text == "")
                {
                    MessageBox.Show("请输入边长");
                }
                else if(comboBox1.Text=="")
                {
                    MessageBox.Show("请选择单位");
                }
                else
                {
                    double size = double.Parse(textBox1.Text.ToString().Trim());
                    double area = size * size;
                    if (this.comboBox1.Text == "cm")
                    {
                        MessageBox.Show("正方形  边长为"+ Math.Round(size,3) + "厘米  面积为"+ Math.Round(area, 3) + "平方厘米");
                    }
                    else if (this.comboBox1.Text == "inch")
                    {
                        size *= 2.54;
                        area = area * 2.54 * 2.54;
                        MessageBox.Show("正方形  边长为"+ Math.Round(size, 3) + "厘米  面积为" + Math.Round(area, 3) + "平方厘米");
                    }
                }
            }
            if (rec)
            {
                if (textBox1.Text == "")
                {
                    MessageBox.Show("请输入长");
                }
                else if(textBox2.Text=="")
                {
                    MessageBox.Show("请输入宽");
                }
                else if (comboBox1.Text == "")
                {
                    MessageBox.Show("请选择单位");
                }
                else
                {
                    double size1 = double.Parse(textBox1.Text.ToString().Trim());
                    double size2 = double.Parse(textBox2.Text.ToString().Trim());
                    double area = size1 * size2;
                    Math.Round(area, 3);
                    if (this.comboBox1.Text == "cm")
                    {
                        MessageBox.Show("长方形  长为" + Math.Round(size1, 3) + "厘米  宽为"+ Math.Round(size2, 3) + "厘米  面积为" + Math.Round(area, 3) + "平方厘米");
                    }
                    else if (this.comboBox1.Text == "inch")
                    {
                        size1 *= 2.54;
                        size2 *= 2.54;
                        area = area * 2.54 * 2.54;
                        MessageBox.Show("长方形  长为" + Math.Round(size1, 3) + "厘米  宽为" + Math.Round(size2, 3) + "厘米  面积为" + Math.Round(area, 3) + "平方厘米");
                    }
                }
            }
            if (cir)
            {
                if (textBox1.Text == "")
                {
                    MessageBox.Show("请输入直径");
                }
                else if (comboBox1.Text == "")
                {
                    MessageBox.Show("请选择单位");
                }
                else
                {
                    double dia = double.Parse(textBox1.Text.ToString().Trim());
                    double area = dia * dia * 3.14 / 4;
                    if (this.comboBox1.Text == "cm")
                    {
                        MessageBox.Show("圆形  直径为" + Math.Round(dia, 3) + "厘米  面积为" + Math.Round(area, 3) + "平方厘米");
                    }
                    else if (this.comboBox1.Text == "inch")
                    {
                        dia *= 2.54;
                        area = area * 2.54 * 2.54;
                        MessageBox.Show("圆形  直径为" + Math.Round(dia, 3) + "厘米  面积为" + Math.Round(area, 3) + "平方厘米");
                    }
                }
            }
            if (tri)
            {
                if (textBox1.Text == "")
                {
                    MessageBox.Show("请输入高");
                }
                else if (textBox2.Text == "")
                {
                    MessageBox.Show("请输入底");
                }
                else if (comboBox1.Text == "")
                {
                    MessageBox.Show("请选择单位");
                }
                else
                {
                    double high = double.Parse(textBox1.Text.ToString().Trim());
                    double bottom = double.Parse(textBox2.Text.ToString().Trim());
                    double area = high * bottom / 2;
                    if (this.comboBox1.Text == "cm")
                    {
                        MessageBox.Show("三角形  高为" + Math.Round(high, 3) + "厘米  底为" + Math.Round(bottom, 3) + "厘米  面积为" + Math.Round(area, 3) + "平方厘米");
                    }
                    else if (this.comboBox1.Text == "inch")
                    {
                        high *= 2.54;
                        bottom *= 2.54;
                        area = area * 2.54 * 2.54;
                        MessageBox.Show("三角形  高为" + Math.Round(high, 3) + "厘米  底为" + Math.Round(bottom, 3) + "厘米  面积为" + Math.Round(area, 3) + "平方厘米");
                    }
                }
            }
        }
          private void textBox3_TextChanged(object sender, EventArgs e)
        {

        }
          private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

    } 
}
